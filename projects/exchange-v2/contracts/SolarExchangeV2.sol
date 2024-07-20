// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "./ExchangeV2Core.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";

interface IAccount{
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
    function owner() external view returns (address); // TBA owner
}
interface ISolarDapp{
    function getUserTBA(address account) external view returns(uint tbaNftId, address tbaAddress);
    function createTBA(address account) external returns(address);
}

contract SolarExchangeV2 is ITransferManager, ExchangeV2Core {
    using SafeMathUpgradeable for uint;
    bytes4 constant IERC6551Account_interfaceId = 0x6faff5f1; 
    uint256 private constant UINT256_MAX = type(uint256).max;
    bool private _enableTba;
    uint256 private _sellTax;
    address private _taxRecvAddress;
    address private _solarDappAddress;

    function __ExchangeV2_init(
        address transferProxy,
        address erc20TransferProxy,
        address solarDapp
    ) external initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __OrderValidator_init_unchained();
        __TransferExecutor_init_unchained(transferProxy, erc20TransferProxy);
        _enableTba = true;
        _sellTax = 500; // 100/10000
        _taxRecvAddress = solarDapp;
        _solarDappAddress = solarDapp;
    }    

    function setEnableTba(bool enable) external onlyOwner{
        _enableTba=enable;
    }

    function setSellTax(uint256 tax) external onlyOwner{
        _sellTax = tax;
    }

    function setTaxRecvAddress(address addr) external onlyOwner{
        _taxRecvAddress = addr;
    }

    function getAllParam() external view returns(bool enableTba, uint256 sellTax, address taxRecvAddress, address solarDappAddress){
        enableTba = _enableTba;
        sellTax = _sellTax;
        taxRecvAddress = _taxRecvAddress;
        solarDappAddress = _solarDappAddress;
    }

    function doTransfers(
        LibDeal.DealSide memory left, // LibAsset.Asset
        LibDeal.DealSide memory right,
        LibFeeSide.FeeSide feeSide
    ) override internal returns (uint totalMakeValue, uint totalTakeValue) {

        totalMakeValue = left.asset.value;
        totalTakeValue = right.asset.value;

        if(_sellTax>0){
            if(feeSide == LibFeeSide.FeeSide.LEFT){
                uint tax = left.asset.value.mul(_sellTax).div(10000);
                (address token) = abi.decode(left.asset.assetType.data, (address));
                IERC20TransferProxy(left.proxy).erc20safeTransferFrom(IERC20Upgradeable(token), left.from, _taxRecvAddress, tax);
                // update asset value
                left.asset.value = left.asset.value.sub(tax);

            }else if(feeSide == LibFeeSide.FeeSide.RIGHT){
                uint tax = right.asset.value.mul(_sellTax).div(10000);
                (address token) = abi.decode(right.asset.assetType.data, (address));
                IERC20TransferProxy(right.proxy).erc20safeTransferFrom(IERC20Upgradeable(token), right.from, _taxRecvAddress, tax);
                // update asset value
                right.asset.value = right.asset.value.sub(tax);
            }
        }
        if(_enableTba){
            transfer(left.asset, left.from, _getTranferToAddress(left.asset.assetType.assetClass, right.from), left.proxy);
            transfer(right.asset, right.from, _getTranferToAddress(right.asset.assetType.assetClass, left.from), right.proxy);
        }else{
            transfer(left.asset, left.from, right.from, left.proxy);
            transfer(right.asset, right.from, left.from, right.proxy);
        }
    }

    function cancel(LibOrder.Order memory order) override external {
        require(_msgSender() == order.maker || _msgSender() == getTbaOwner(order.maker) , "not a maker");
        require(order.salt != 0, "0 salt can't be used");
        bytes32 orderKeyHash = LibOrder.hashKey(order);
        fills[orderKeyHash] = UINT256_MAX;
        emit Cancel(orderKeyHash);
    }

    // 1 List<=>N Buy, 1 Bid<=>N Sale
    function matchOrders(
        LibOrder.Order memory orderLeft,
        bytes memory signatureLeft,
        LibOrder.Order[] memory orderRightList,
        bytes[] memory signatureRightList
    ) external payable {
        uint256 len = orderRightList.length;
        for(uint256 i=0;i<len;++i){
            validateOrders(orderLeft, signatureLeft, orderRightList[i], signatureRightList[i]);            
            matchAndTransfer(orderLeft, orderRightList[i]);
        }
    }
    // N List<=>1 Buy, N Bid<=>1 Sale
    function matchOrders(
        LibOrder.Order[] memory orderLeftList,
        bytes[] memory signatureLeftList,
        LibOrder.Order memory orderRight,
        bytes memory signatureRight
    ) external payable {
        uint256 len = orderLeftList.length;
        for(uint256 i=0;i<len;++i){
            validateOrders(orderLeftList[i], signatureLeftList[i], orderRight, signatureRight);            
            matchAndTransfer(orderLeftList[i], orderRight);
        }
    }

    function getOrderHash(LibOrder.Order memory order) external pure returns(bytes32 orderHash, bytes32 orderHashkey) {
        orderHash = LibOrder.hash(order);
        orderHashkey = LibOrder.hashKey(order);
    }

    function isValidateOrders(LibOrder.Order memory orderLeft, bytes memory signatureLeft, LibOrder.Order memory orderRight, bytes memory signatureRight) external view returns(bool) {
        validateFull(orderLeft, signatureLeft);
        validateFull(orderRight, signatureRight);
        if (orderLeft.taker != address(0)) {
            if (orderRight.maker != address(0))
                return orderRight.maker == orderLeft.taker;
        }
        if (orderRight.taker != address(0)) {
            if (orderLeft.maker != address(0))
                return orderRight.taker == orderLeft.maker;
        }
        return true;
    }
    
    function getMatchAssets(LibOrder.Order memory orderLeft, LibOrder.Order memory orderRight) external view returns (bool isMatch, LibAsset.AssetType memory makeMatch, LibAsset.AssetType memory takeMatch) {
        makeMatch = matchAssets(orderLeft.makeAsset.assetType, orderRight.takeAsset.assetType);
        if(makeMatch.assetClass == 0) return (false, makeMatch, takeMatch);
        takeMatch = matchAssets(orderLeft.takeAsset.assetType, orderRight.makeAsset.assetType);
        if(takeMatch.assetClass == 0) return (false, makeMatch, takeMatch);
        isMatch = true;
    }

    function isERC6551Account(address addr) internal view returns(bool){
        if(!isContract(addr)) return false;
        try IAccount(addr).supportsInterface(IERC6551Account_interfaceId) returns (bool supported){
            return supported;
        }catch{
            return false;
        }
    }

    function _getTranferToAddress(bytes4 assetClass, address orgAddress) internal returns(address toAddress){
        if(assetClass == LibAsset.ERC20_ASSET_CLASS || assetClass == LibAsset.ETH_ASSET_CLASS){ 
            // !NFT asset, transfer to EOA
            toAddress = getTbaOwner(orgAddress);
        }else{
            // NFT asset, transfer to TBA
            (, toAddress) = ISolarDapp(_solarDappAddress).getUserTBA(orgAddress);
            if(toAddress == address(0)){
                toAddress = ISolarDapp(_solarDappAddress).createTBA(orgAddress);
            }
        }
    }

    // If addr is a TBA contract, return the owner of TBA; otherwise, return the original value
    function getTbaOwner(address addr) public view returns(address){
        if(isERC6551Account(addr)){
            try IAccount(addr).owner() returns (address tbaOwner){
                return tbaOwner;
            }catch{
                return addr;
            }
        }
        return addr;
    }    
    
    function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }
}
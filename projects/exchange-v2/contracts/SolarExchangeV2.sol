// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "./ExchangeV2Core.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";

interface IAccount{
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
    function owner() external view returns (address); // TBA owner
}

contract SolarExchangeV2 is ITransferManager, ExchangeV2Core {
    using SafeMathUpgradeable for uint;
    bytes4 constant IERC6551Account_interfaceId = 0x6faff5f1;
    bool public enableTba;
    function setEnableTba(bool enable) external onlyOwner{
        enableTba=enable;
    }
    function __ExchangeV2_init(
        address _transferProxy,
        address _erc20TransferProxy
    ) external initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __OrderValidator_init_unchained();
        __TransferExecutor_init_unchained(_transferProxy, _erc20TransferProxy);
        enableTba = true;
    }    

    function doTransfers(
        LibDeal.DealSide memory left,
        LibDeal.DealSide memory right,
        LibFeeSide.FeeSide feeSide
    ) override internal returns (uint totalMakeValue, uint totalTakeValue) {
        if(enableTba){
            transfer(left.asset, left.from, getTbaOwner(right.from), left.proxy);
            transfer(right.asset, right.from, getTbaOwner(left.from), right.proxy);
        }else{
            transfer(left.asset, left.from, right.from, left.proxy);
            transfer(right.asset, right.from, left.from, right.proxy);
        }
        totalMakeValue = left.asset.value;
        totalTakeValue = right.asset.value;
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
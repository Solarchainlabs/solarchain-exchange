/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  RoyaltiesRegistry,
  RoyaltiesRegistryInterface,
} from "../RoyaltiesRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "value",
            type: "uint96",
          },
        ],
        indexed: false,
        internalType: "struct LibPart.Part[]",
        name: "royalties",
        type: "tuple[]",
      },
    ],
    name: "RoyaltiesSetForContract",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "value",
            type: "uint96",
          },
        ],
        indexed: false,
        internalType: "struct LibPart.Part[]",
        name: "royalties",
        type: "tuple[]",
      },
    ],
    name: "RoyaltiesSetForToken",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "royaltiesByToken",
    outputs: [
      {
        internalType: "bool",
        name: "initialized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "royaltiesByTokenAndTokenId",
    outputs: [
      {
        internalType: "bool",
        name: "initialized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "royaltiesProviders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "__RoyaltiesRegistry_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "provider",
        type: "address",
      },
    ],
    name: "setProviderByToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getRoyaltiesType",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltiesType",
        type: "uint256",
      },
    ],
    name: "forceSetRoyaltiesType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "clearRoyaltiesType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "value",
            type: "uint96",
          },
        ],
        internalType: "struct LibPart.Part[]",
        name: "royalties",
        type: "tuple[]",
      },
    ],
    name: "setRoyaltiesByToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getRoyalties",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "value",
            type: "uint96",
          },
        ],
        internalType: "struct LibPart.Part[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611b75806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80639ca7dc7a1161008c578063d836f01311610066578063d836f013146101cb578063f2fde38b146101de578063f39cc706146101f1578063fc73be0014610204576100ea565b80639ca7dc7a14610185578063acf14efb146101a5578063d1da3cce146101b8576100ea565b806355f21eb7116100c857806355f21eb714610135578063715018a61461015557806382b19f121461015d5780638da5cb5b1461017d576100ea565b806305df952f146100ef57806327fff8ab1461011857806336eff6c214610122575b600080fd5b6101026100fd366004611449565b610217565b60405161010f91906118be565b60405180910390f35b61012061022c565b005b6101206101303660046115a9565b6102d6565b610148610143366004611449565b6102f6565b60405161010f9190611830565b610120610315565b61017061016b366004611449565b6103d3565b60405161010f9190611a5f565b6101486103fb565b6101986101933660046115a9565b61040a565b60405161010f919061185d565b6101206101b33660046114b9565b6105a8565b6101026101c6366004611818565b6107e4565b6101206101d9366004611481565b6107f9565b6101206101ec366004611449565b61080e565b6101706101ff366004611449565b610923565b610120610212366004611449565b610935565b60666020526000908152604090205460ff1681565b600054610100900460ff16806102455750610245610966565b80610253575060005460ff16155b61028e5760405162461bcd60e51b815260040180806020018281038252602e815260200180611b12602e913960400191505060405180910390fd5b600054610100900460ff161580156102b9576000805460ff1961ff0019909116610100171660011790555b6102c1610977565b80156102d3576000805461ff00191690555b50565b6102df82610a70565b6102f282826102ed856102f6565b610b46565b5050565b6001600160a01b0381166000908152606760205260409020545b919050565b61031d610b9d565b6001600160a01b031661032e6103fb565b6001600160a01b031614610389576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b6001600160a01b0381166000908152606760205260408120546103f590610ba1565b92915050565b6033546001600160a01b031690565b6001600160a01b038216600090815260676020526040812054606091819061043182610ba1565b90508061044f576104428683610bdf565b905061044f868284610b46565b80600114156104eb576001600160a01b038616600090815260666020908152604080832060010180548251818502810185019093528083529193909284015b828210156104dd57600084815260209081902060408051808201909152908401546001600160a01b0381168252600160a01b90046001600160601b03168183015282526001909201910161048e565b5050505093505050506103f5565b8060021415610508576104fe8686610ded565b93505050506103f5565b806003141561051b576104fe8686610ead565b806004141561052f576104fe868684611161565b8060051415610542576104fe8686611228565b806006141561058757604080516000808252602082019092529061057c565b610569611400565b8152602001906001900390816105615790505b5093505050506103f5565b60405162461bcd60e51b815260040161059f906118de565b60405180910390fd5b6105b182610a70565b6001600160a01b03821660009081526067602052604081208190556105da908390600190610b46565b6001600160a01b0382166000908152606660205260408120805460ff19168155816106086001830182611417565b505060005b82518110156107625760006001600160a01b031683828151811061062d57fe5b6020026020010151600001516001600160a01b031614156106605760405162461bcd60e51b815260040161059f90611915565b82818151811061066c57fe5b6020026020010151602001516001600160601b0316600014156106a15760405162461bcd60e51b815260040161059f906119e2565b60666000856001600160a01b03166001600160a01b031681526020019081526020016000206001018382815181106106d557fe5b602090810291909101810151825460018101845560009384529282902081519301805491909201516001600160601b0316600160a01b026001600160a01b039384166001600160a01b031990921691909117909216919091179055825183908290811061073e57fe5b6020026020010151602001516001600160601b03168201915080600101905061060d565b5061271081106107845760405162461bcd60e51b815260040161059f90611961565b6001600160a01b03831660008181526066602052604090819020805460ff19166001179055517fc026171b9a7c9009d6a748a19a0a3cb877978a585e1647a87a786d724bbde127906107d790859061185d565b60405180910390a2505050565b60656020526000908152604090205460ff1681565b61080282610a70565b6102f282600483610b46565b610816610b9d565b6001600160a01b03166108276103fb565b6001600160a01b031614610882576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166108c75760405162461bcd60e51b8152600401808060200182810382526026815260200180611aec6026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b60676020526000908152604090205481565b61093e81610a70565b610947816102f6565b6001600160a01b03918216600090815260676020526040902091169055565b6000610971306112f2565b15905090565b600054610100900460ff16806109905750610990610966565b8061099e575060005460ff16155b6109d95760405162461bcd60e51b815260040180806020018281038252602e815260200180611b12602e913960400191505060405180910390fd5b600054610100900460ff16158015610a04576000805460ff1961ff0019909116610100171660011790555b6000610a0e610b9d565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35080156102d3576000805461ff001916905550565b610a78610b9d565b6001600160a01b0316610a896103fb565b6001600160a01b031614158015610b295750610aa3610b9d565b6001600160a01b0316816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610ae557600080fd5b505afa158015610af9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1d9190611465565b6001600160a01b031614155b156102d35760405162461bcd60e51b815260040161059f906119ab565b600082118015610b57575060068211155b610b735760405162461bcd60e51b815260040161059f90611a32565b6001600160a01b03928316600090815260676020526040902092166101009190910360020a019055565b3390565b600060015b60068111610bd657806101000360020a8381610bbe57fe5b0460011415610bce579050610310565b600101610ba6565b50600092915050565b6040516301ffc9a760e01b81526000906001600160a01b038416906301ffc9a790610c159063656cb66560e11b906004016118c9565b60206040518083038186803b158015610c2d57600080fd5b505afa925050508015610c5d575060408051601f3d908101601f19168201909252610c5a918101906117f8565b60015b610c6657610c78565b8015610c765760029150506103f5565b505b6040516301ffc9a760e01b81526001600160a01b038416906301ffc9a790610cab90632dde656160e21b906004016118c9565b60206040518083038186803b158015610cc357600080fd5b505afa925050508015610cf3575060408051601f3d908101601f19168201909252610cf0918101906117f8565b60015b610cfc57610d0e565b8015610d0c5760039150506103f5565b505b6040516301ffc9a760e01b81526001600160a01b038416906301ffc9a790610d419063152a902d60e11b906004016118c9565b60206040518083038186803b158015610d5957600080fd5b505afa925050508015610d89575060408051601f3d908101601f19168201909252610d86918101906117f8565b60015b610d9257610da4565b8015610da25760059150506103f5565b505b6001600160a01b03821615610dbb575060046103f5565b6001600160a01b03831660009081526066602052604090205460ff1615610de4575060016103f5565b50600692915050565b60405163656cb66560e11b81526060906001600160a01b0384169063cad96cca90610e1c908590600401611a5f565b60006040518083038186803b158015610e3457600080fd5b505afa925050508015610e6957506040513d6000823e601f3d908101601f19168201604052610e66919081019061169a565b60015b610ea6576040805160008082526020820190925290610e9e565b610e8b611400565b815260200190600190039081610e835790505b5090506103f5565b90506103f5565b60405163b9c4d9fb60e01b8152606090839082906001600160a01b0383169063b9c4d9fb90610ee0908790600401611a5f565b60006040518083038186803b158015610ef857600080fd5b505afa925050508015610f2d57506040513d6000823e601f3d908101601f19168201604052610f2a9190810190611601565b60015b610f6c576040805160008082526020820190925290610f62565b610f4f611400565b815260200190600190039081610f475790505b50925050506103f5565b9050604051630ebd4c7f60e01b81526060906001600160a01b03841690630ebd4c7f90610f9d908890600401611a5f565b60006040518083038186803b158015610fb557600080fd5b505afa925050508015610fea57506040513d6000823e601f3d908101601f19168201604052610fe79190810190611774565b60015b61102957604080516000808252602082019092529061057c565b61100c611400565b8152602001906001900390816110045790505093505050506103f5565b9050815181511461106f57604080516000808252602082019092529061057c565b611052611400565b81526020019060019003908161104a5790505093505050506103f5565b6000815167ffffffffffffffff8111801561108957600080fd5b506040519080825280602002602001820160405280156110c357816020015b6110b0611400565b8152602001906001900390816110a85790505b50905060005b8251811015611156578281815181106110de57fe5b60200260200101518282815181106110f257fe5b6020026020010151602001906001600160601b031690816001600160601b03168152505083818151811061112257fe5b602002602001015182828151811061113657fe5b60209081029190910101516001600160a01b0390911690526001016110c9565b509695505050505050565b604051634e53ee3d60e11b81526060906001600160a01b03831690639ca7dc7a906111929087908790600401611844565b600060405180830381600087803b1580156111ac57600080fd5b505af19250505080156111e157506040513d6000823e601f3d908101601f191682016040526111de919081019061169a565b60015b61121e576040805160008082526020820190925290611216565b611203611400565b8152602001906001900390816111fb5790505b509050611221565b90505b9392505050565b60405163152a902d60e11b81526060906001600160a01b03841690632a55205a9061125c908590620f424090600401611a68565b604080518083038186803b15801561127357600080fd5b505afa9250505080156112a3575060408051601f3d908101601f191682019092526112a0918101906115d4565b60015b6112df576040805160008082526020820190925290610e9e565b6112c5611400565b8152602001906001900390816112bd5790505090506103f5565b6112e982826112f8565b925050506103f5565b3b151590565b606080826113075790506103f5565b6000620f42406127108502049050612710811061136b576040805162461bcd60e51b815260206004820152601b60248201527f526f79616c746965732032393831206578636565647320313030250000000000604482015290519081900360640190fd5b60408051600180825281830190925290816020015b611388611400565b81526020019060019003908161138057905050915084826000815181106113ab57fe5b6020026020010151600001906001600160a01b031690816001600160a01b03168152505080826000815181106113dd57fe5b6020908102919091018101516001600160601b0390921691015250905092915050565b604080518082019091526000808252602082015290565b50805460008255906000526020600020908101906102d391905b808211156114455760008155600101611431565b5090565b60006020828403121561145a578081fd5b813561122181611ac1565b600060208284031215611476578081fd5b815161122181611ac1565b60008060408385031215611493578081fd5b823561149e81611ac1565b915060208301356114ae81611ac1565b809150509250929050565b60008060408084860312156114cc578283fd5b83356114d781611ac1565b925060208481013567ffffffffffffffff808211156114f4578485fd5b818701915087601f830112611507578485fd5b813561151a61151582611aa3565b611a7f565b81815284810190848601878402860187018c1015611536578889fd5b8895505b838610156115975787818d031215611550578889fd5b8751888101818110878211171561156357fe5b8952813561157081611ac1565b81528188013561157f81611ad6565b8189015283526001959095019491860191870161153a565b50809750505050505050509250929050565b600080604083850312156115bb578182fd5b82356115c681611ac1565b946020939093013593505050565b600080604083850312156115e6578182fd5b82516115f181611ac1565b6020939093015192949293505050565b60006020808385031215611613578182fd5b825167ffffffffffffffff811115611629578283fd5b8301601f81018513611639578283fd5b805161164761151582611aa3565b8181528381019083850185840285018601891015611663578687fd5b8694505b8385101561168e57805161167a81611ac1565b835260019490940193918501918501611667565b50979650505050505050565b600060208083850312156116ac578182fd5b825167ffffffffffffffff808211156116c3578384fd5b818501915085601f8301126116d6578384fd5b81516116e461151582611aa3565b818152848101908486016040808502870188018b1015611702578889fd5b8896505b848710156117655780828c03121561171c578889fd5b8051818101818110888211171561172f57fe5b8252825161173c81611ac1565b81528289015161174b81611ad6565b818a01528452600196909601959287019290810190611706565b50909998505050505050505050565b60006020808385031215611786578182fd5b825167ffffffffffffffff81111561179c578283fd5b8301601f810185136117ac578283fd5b80516117ba61151582611aa3565b81815283810190838501858402850186018910156117d6578687fd5b8694505b8385101561168e5780518352600194909401939185019185016117da565b600060208284031215611809578081fd5b81518015158114611221578182fd5b600060208284031215611829578081fd5b5035919050565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b602080825282518282018190526000919060409081850190868401855b828110156118b157815180516001600160a01b031685528601516001600160601b031686850152928401929085019060010161187a565b5091979650505050505050565b901515815260200190565b6001600160e01b031991909116815260200190565b6020808252601f908201527f736f6d657468696e672077726f6e6720696e20676574526f79616c7469657300604082015260600190565b6020808252602c908201527f526f79616c746965734279546f6b656e20726563697069656e742073686f756c60408201526b19081899481c1c995cd95b9d60a21b606082015260800190565b6020808252602a908201527f53657420627920746f6b656e20726f79616c746965732073756d206d6f72652c604082015269207468616e203130302560b01b606082015260800190565b60208082526018908201527f546f6b656e206f776e6572206e6f742064657465637465640000000000000000604082015260600190565b60208082526030908201527f526f79616c74792076616c756520666f7220526f79616c746965734279546f6b60408201526f0656e2073686f756c64206265203e20360841b606082015260800190565b60208082526013908201527277726f6e6720726f79616c746965735479706560681b604082015260600190565b90815260200190565b9182526001600160601b0316602082015260400190565b60405181810167ffffffffffffffff81118282101715611a9b57fe5b604052919050565b600067ffffffffffffffff821115611ab757fe5b5060209081020190565b6001600160a01b03811681146102d357600080fd5b6001600160601b03811681146102d357600080fdfe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564a2646970667358221220f878997b3993921c7d742a989b91f3f44ce15246365b6de753ca92808d9c105c64736f6c63430007060033";

type RoyaltiesRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RoyaltiesRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RoyaltiesRegistry__factory extends ContractFactory {
  constructor(...args: RoyaltiesRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RoyaltiesRegistry> {
    return super.deploy(overrides || {}) as Promise<RoyaltiesRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): RoyaltiesRegistry {
    return super.attach(address) as RoyaltiesRegistry;
  }
  override connect(signer: Signer): RoyaltiesRegistry__factory {
    return super.connect(signer) as RoyaltiesRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RoyaltiesRegistryInterface {
    return new utils.Interface(_abi) as RoyaltiesRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RoyaltiesRegistry {
    return new Contract(address, _abi, signerOrProvider) as RoyaltiesRegistry;
  }
}
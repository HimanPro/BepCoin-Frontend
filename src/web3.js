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
export const tokenApprove = async (amt, TokenAddress, ContractAddress) => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const from = accounts[0];

    const token = new web3.eth.Contract(TokenABI, TokenAddress);

    const amount = BigInt(Math.floor(amt));
    // Unlimited approve (max uint256)
    // const MAX_UINT256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

    const tx = await token.methods
      .approve(ContractAddress, amount)
      .send({ from });

    console.log("Approval Tx:", tx);

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
  try {
    const res = tokenApprove(amt, TokenAddress, ContractAddress);

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

  // Agar transaction hash pass hua ho, to receipt fetch karo
  if (typeof txReceipt === "string") {
    receipt = await web3.eth.getTransactionReceipt(txReceipt);
  }

  // Check event properly decoded hai ya nahi
  if (!receipt.events || !receipt.events.Approval) {
    throw new Error("Approval event not found in transaction receipt");
  }

  const approvalEvent = receipt.events.Approval.returnValues;

  return {
    from: approvalEvent.owner,
    spender: approvalEvent.spender,
    amount: (Number(approvalEvent.value) / 10 ** decimals).toString(),
    rawAmount: approvalEvent.value,
    txHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
  };
};


import {
  getBalance,
  getTransactionReceipt,
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";

import { config } from "./main";
import toast from "react-hot-toast";
import { TokenABI } from "./wagmiConfig";
import { formatUnits } from "viem";


export const checkAllowance = async (owner, TokenAddress, ContractAddress) => {
  const result = await readContract(config, {
    abi: TokenABI,
    address: TokenAddress,
    functionName: "allowance",
    args: [owner, ContractAddress],
  });
  return Number(result);
};

export const tokenApprove = async (amt, TokenAddress, ContractAddress) => {
  const result = await writeContract(config, {
    abi: TokenABI,
    address: TokenAddress,
    functionName: "approve",
    args: [
      ContractAddress,
      (amt * Number("1e18")).toLocaleString("fullwide", {
        useGrouping: false,
      }),
    ],
  });

  const receipt = await waitForTransactionReceipt(config, {
    hash: result,
  });
  console.log(receipt, result, "data check");
  const res2 = await getApprovalDetails(result);
  console.log(res2, "done res2");
  return receipt;
};

export const appToken = async (amt, TokenAddress, ContractAddress) => {
  try {
    const res = tokenApprove(amt, TokenAddress, ContractAddress);
    await toast.promise(res, {
      loading: "Wait for Approvel.........",
      success: "Success!",
      error: "Approval Failed",
    });
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getApprovalDetails = async (txHash, decimals = 18) => {
  const receipt = await getTransactionReceipt(config, { hash: txHash });

  const from = receipt.from;
  const blockNumber = receipt.blockNumber;

  // Find the Approval log
  const approvalTopic =
    "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";

  const log = receipt.logs.find((l) => l.topics[0] === approvalTopic);
  if (!log) throw new Error("No Approval event found");

  const owner = "0x" + log.topics[1].slice(26);
  const spender = "0x" + log.topics[2].slice(26);
  const rawAmount = BigInt(log.data);

  return {
    from: owner, // same as msg.sender
    spender,
    amount: formatUnits(rawAmount, decimals),
    rawAmount,
    txHash,
    blockNumber,
  };
};


import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";

export const TokenForm: FC = () => {
  const [txSig, setTxSig] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const sendSol = (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }
    const transaction = new web3.Transaction();
    const recipientPubKey = new web3.PublicKey(event.target.recipient.value);

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL * event.target.amount.value,
    });

    transaction.add(sendSolInstruction);
    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig);
    });
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto">
      {publicKey ? (
        <form onSubmit={sendSol} className="mt-8 p-6 bg-white rounded-md shadow-md">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600">Amount (in SOL) to send:</label>
          <input
            id="amount"
            type="text"
            className="mt-1 p-1 w-full border border-gray-300 rounded-md"
            placeholder="e.g. 0.1"
            required
          />
          <br />
          <label htmlFor="recipient" className="mt-8 block text-sm font-medium text-gray-600">Send SOL to:</label>
          <input
            id="recipient"
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="e.g. 9fyNwL3B5U4M78UmD1U5XqYiYzj6Qp4eQz2XwLbTgyQR"
            required
          />
          <button type="submit" className="mt-10 p-4 py-2 font-bold text-white bg-green-500 rounded-md transition duration-300 ease-in-out hover:bg-green-600">
            Send
          </button>
        </form>
      ) : (
        <span className="block text-center text-xl font-semibold text-white m-4">Connect to your wallet</span>
      )}
      {txSig ? (
        <div className="mt-4">
          <p>View your transaction on </p>
          <a className="text-blue-500 underline" href={link()}>Solana Explorer</a>
        </div>
      ) : null}
    </div>
  );
};

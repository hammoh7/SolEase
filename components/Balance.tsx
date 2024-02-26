import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

export const Balance: FC = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    // Ensure the balance updates after the transaction completes
    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info?.lamports || 0);
    });
  }, [connection, publicKey]);

  return (
    <div className=" text-center font-semibold text-white text-2xl m-4 p-4 border bg-indigo-600 border-gray-300 rounded-md">
      ! Welcome to SolEase !
      <p className="text-xl font-semibold text-center">
        {publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} sol` : ""}
      </p>
    </div>
  );
};

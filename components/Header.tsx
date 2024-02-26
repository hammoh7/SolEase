import { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <div className="bg-white flex justify-between p-5 border-b">
      <div>
        <Link className="font-bold text-2xl text-violet-600" href="/">SolEase</Link>
      </div>
      <div className="flex items-center mr-10">
        <WalletMultiButton />
      </div>
    </div>
  );
};

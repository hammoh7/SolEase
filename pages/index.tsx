import { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { Balance } from "../components/Balance";
import { TokenForm } from "../components/TokenForm";
import WalletSolanaProvider from "../components/WalletSolanaProvider";
import { useEffect } from "react";

const Home: NextPage = (props) => {
  useEffect(() => {
    // Set the body overflow to hidden to prevent scrolling
    document.body.style.overflow = "hidden";

    // Cleanup when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="bg-gradient-to-t from-indigo-800 to-blue-300 h-full max-w-full">
      <Head>
        <title>SolEase | Seamless transaction of Sols</title>
        <meta name="SolEase" content="SolEase" />
      </Head>
      <WalletSolanaProvider>
        <Header />
        <div className="h-full max-w-md mx-auto flex flex-col">
          <Balance />
        </div>
        <div className="h-full max-w-md mx-auto">
          <TokenForm />
        </div>
      </WalletSolanaProvider>
    </div>
  );
};

export default Home;

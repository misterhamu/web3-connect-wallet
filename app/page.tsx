"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";

function Page() {
  const { isConnected } = useAccount() 
  const { chain } = useNetwork()
  const { data, error, isLoading, signMessage, isError } = useSignMessage({
    onSuccess(data, variables) {
      alert(data);
    },
    onError(error) {},
  });

  useEffect(()=>{
    if(isConnected && !chain?.unsupported){
      signMessage({ message: "test Sign Message" });
    }

  },[isConnected,chain]
  )
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>

      <div
        onClick={() => {
          signMessage({ message: "test Sign Message" });
        }}
      >
        Sign Message
      </div>
    </>
  );
}

export default Page;

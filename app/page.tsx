"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignMessage } from "wagmi";

function Page() {
  const { data, error, isLoading, signMessage, isError } = useSignMessage({
    onSuccess(data, variables) {
      alert(data);
    },
    onError(error) {},
  });
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

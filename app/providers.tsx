'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';

export const ariseChain: any = {
  id: 4833,
  name: 'Arise Testnet',
network: 'arisetestnet',
  nativeCurrency: {
      decimals: 18,
  name: 'Arise',
  symbol: 'Arise',
  },
rpcUrls: {
  public: {
    http: ['https://aster-rpc-nonprd.arisetech.dev'],
  },
  default: {
    http: ['https://aster-rpc-nonprd.arisetech.dev'],
  },
},
  testnet: true,
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ariseChain,
  ],
  [publicProvider()]
);

const projectId = 'e72d746a6792f5d3428e42892f52a725';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  {
    groupName: 'Metamask',
    wallets: [
      metaMaskWallet({ projectId, chains })
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

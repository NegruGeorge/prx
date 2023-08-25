import React from 'react';
import logo from './logo.svg';
import './App.css';
import PermanentDrawer from './components/PermanentDrawer';

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { chain, configureChains, createClient, WagmiConfig ,useAccount} from "wagmi";
import { useWeb3Modal, Web3Button } from '@web3modal/react';
const chains = [chain.mainnet, chain.polygon,chain.goerli];

// const projectID = process.env.NEXT_PUBLIC_PROJECT_ID
const projectId = "a093c0229aa44994915f66427f183663"

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId}),
]);
const wagmiClient = createClient({
  // autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  return (
    <>
    <WagmiConfig client={wagmiClient}>
     <PermanentDrawer/>
    </WagmiConfig>

    <Web3Modal
      projectId={projectId}
      ethereumClient={ethereumClient}
    />
    </>
  );
}

export default App;

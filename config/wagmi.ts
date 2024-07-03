import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { getWagmiChainConfig } from "./env";

// 1. Get projectId
export const walletConnectProjectId = "49d39e856ab00fbe22d96b7a700a9739";
// 2. Configure wagmi client
const chains = [getWagmiChainConfig()];

const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: walletConnectProjectId }),
]);

export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    ...w3mConnectors({
      // version: 2,
      chains,
      projectId: walletConnectProjectId,
    }),
  ],
  publicClient,
});

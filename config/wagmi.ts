import { createConfig, http } from "wagmi";
import { getEthereumChainId, getEthereumRpc } from "./env";
import { holesky, mainnet, pulsechain, pulsechainV4 } from "viem/chains";

const wagmiChain =
  getEthereumChainId() === mainnet.id
    ? mainnet
    : getEthereumChainId() === holesky.id
    ? holesky
    : getEthereumChainId() === pulsechain.id
    ? pulsechain
    : getEthereumChainId() === pulsechainV4.id
    ? pulsechainV4
    : mainnet;

const transports = {
  [mainnet.id]: http(),
  [holesky.id]: http(),
  [pulsechain.id]: http(),
  [pulsechainV4.id]: http(),
};

export const wagmiConfig = createConfig({
  chains: [wagmiChain],
  transports: {
    ...transports,
    [wagmiChain.id]: http(getEthereumRpc()),
  },
});

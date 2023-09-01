export enum RequestStatus {
  loading = 1,
  success = 2,
  error = 3,
}

export enum WalletType {
  MetaMask = "MetaMask",
  Polkadot = "Polkadot",
  Polkadot_KSM = "Polkadot_KSM",
  Polkadot_DOT = "Polkadot_DOT",
  Phantom = "Phantom",
  Keplr = "Keplr",
}

export enum ApiChainId {
  STAFI = 1,
  ETH = 2,
  BSC = 3,
  SOL = 4,
  STAFIHUB = 80,
}

export enum TokenStandard {
  Native = "Native",
  ERC20 = "ERC20",
  BEP20 = "BEP20",
  SPL = "SPL",
  ICS20 = "ICS20",
  Arbitrum = "Arbitrum",
  Optimism = "Optimism",
  Polygon = "Polygon",
}

export enum EthPubkeyStatus {
  all = 0,
  deposited = 2,
  staked = 3,
  unmatch = 4,
  waiting = 8,
  active = 9,
  exited = 10,
  pending = 20,
  slashed = 30,
}

export interface EthPubkey {
  pubkey: string;
  status: number;
  everSlashed: boolean;
}

export interface NavigationItem {
  name: string;
  path?: string;
}

export interface Fee {
  amount: string;
  tokenName: string;
}

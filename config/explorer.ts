import { isDev } from "./env";

export function getEtherScanUrl() {
  if (isDev()) {
    return `https://goerli.etherscan.io`;
  }
  return `https://etherscan.io`;
}

export function getEtherScanTxUrl(txHash: string | undefined) {
  if (isDev()) {
    return `https://goerli.etherscan.io/tx/${txHash}`;
  }
  return `https://etherscan.io/tx/${txHash}`;
}

export function getEtherScanAccountUrl(account: string) {
  if (isDev()) {
    return `https://goerli.etherscan.io/address/${account}`;
  }
  return `https://etherscan.io/address/${account}`;
}

export function getEtherScanErc20TxUrl(address: any) {
  if (isDev()) {
    return `https://goerli.etherscan.io/address/${address}#tokentxns`;
  }
  return `https://etherscan.io/address/${address}#tokentxns`;
}

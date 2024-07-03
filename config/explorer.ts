import { getExplorerUrl, isDev } from "./env";

export function getEtherScanTxUrl(txHash: string | undefined) {
  if (isDev()) {
    return `${getExplorerUrl()}/tx/${txHash}`;
  }
  return `${getExplorerUrl()}/tx/${txHash}`;
}

export function getEtherScanAccountUrl(account: string) {
  if (isDev()) {
    return `${getExplorerUrl()}/address/${account}`;
  }
  return `${getExplorerUrl()}/address/${account}`;
}

export function getEtherScanErc20TxUrl(address: any) {
  if (isDev()) {
    return `${getExplorerUrl()}/address/${address}#tokentxns`;
  }
  return `${getExplorerUrl()}/address/${address}#tokentxns`;
}

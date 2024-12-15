import { RootState } from "redux/store";
import { useAppSelector } from "./common";

export function useWalletAccount() {
  const metaMaskAccount = useAppSelector((state: RootState) => state.wallet.metaMaskAccount)
  const metaMaskChainId = useAppSelector((state: RootState) => state.wallet.metaMaskChainId)

  return {
    metaMaskAccount,
    metaMaskChainId,
  };
}

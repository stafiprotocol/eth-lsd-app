import { RootState } from "redux/store";
import { useAppSelector } from "./common";

export function useWalletAccount() {
  const { metaMaskAccount, metaMaskChainId } = useAppSelector(
    (state: RootState) => {
      return {
        metaMaskAccount: state.wallet.metaMaskDisconnected
          ? undefined
          : state.wallet.metaMaskAccount,
        metaMaskChainId: state.wallet.metaMaskChainId,
      };
    }
  );

  return {
    metaMaskAccount,
    metaMaskChainId,
  };
}

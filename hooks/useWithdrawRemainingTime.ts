import { useCallback, useEffect, useState } from "react";
import { useWalletAccount } from "./useWalletAccount";
import { useAppSlice } from "./selector";

export function useEthWithdrawRemainingTime() {
  const { metaMaskAccount } = useWalletAccount();
  const { updateFlag } = useAppSlice();

  const [remainingDays, setRemainingDays] = useState("");

  const updateMyReward = useCallback(async () => {
    if (!metaMaskAccount) {
      return;
    }
    // todo: query remaining days
    setRemainingDays("5");
  }, [metaMaskAccount]);

  useEffect(() => {
    if (updateFlag) {
      updateMyReward();
    }
  }, [updateMyReward, updateFlag]);

  return {
    remainingDays,
  };
}

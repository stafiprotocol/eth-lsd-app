import { getApiHost } from "config/env";
import { useCallback, useEffect, useState } from "react";
import { useWalletAccount } from "./useWalletAccount";
import { API_CODE_SUCCESS } from "constants/common";
import { useAppSlice } from "./selector";

export function useEthWithdrawRemainingTime() {
  const { metaMaskAccount } = useWalletAccount();
  const { updateFlag } = useAppSlice();

  const [remainingDays, setRemainingDays] = useState("");

  const updateMyReward = useCallback(async () => {
    if (!metaMaskAccount) {
      return;
    }
    try {
      const params = {
        stakerAddress: metaMaskAccount,
      };
      const response = await fetch(
        `${getApiHost()}/reth/v1/staker/withdrawRemainingTime`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      const resJson = await response.json();
      if (resJson && resJson.status === API_CODE_SUCCESS) {
        setRemainingDays(
          Math.ceil(Number(resJson.data.remainingSeconds) / (24 * 3600)) + ""
        );
      } else {
        throw Error("Network request error: " + resJson.status);
      }
    } catch {}
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

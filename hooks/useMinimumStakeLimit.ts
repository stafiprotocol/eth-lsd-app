import {
  getEthDepositContractAbi,
  getEthDepositContract,
} from "config/contract";
import { useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import { useAppSlice } from "./selector";
import { useWalletAccount } from "./useWalletAccount";
import Web3 from "web3";

export function useMinimumStakeLimit() {
  const { updateFlag } = useAppSlice();
  const { metaMaskAccount } = useWalletAccount();

  const [minimumDeposit, setMinimumDeposit] = useState<string>();

  useEffect(() => {
    (async () => {
      if (!metaMaskAccount) {
        return;
      }
      try {
        const web3 = getEthWeb3();
        let contract = new web3.eth.Contract(
          getEthDepositContractAbi(),
          getEthDepositContract(),
          {}
        );

        const minimumDeposit = await contract.methods
          .getMinimumDeposit()
          .call();

        if (!minimumDeposit) {
          setMinimumDeposit("0");
        } else {
          setMinimumDeposit(Web3.utils.fromWei(minimumDeposit + "", "ether"));
        }
      } catch (err: any) {}
    })();
  }, [metaMaskAccount, updateFlag]);

  return {
    minimumDeposit,
  };
}

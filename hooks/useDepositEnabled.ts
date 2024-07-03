import {
  getEthDepositContractAbi,
  getEthDepositContract,
} from "config/contract";
import { useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import { useAppSlice } from "./selector";
import Web3 from "web3";

export function useDepositEnabled() {
  const { updateFlag } = useAppSlice();

  const [depositEnabled, setDepositEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const web3 = getEthWeb3();
        let contract = new web3.eth.Contract(
          getEthDepositContractAbi(),
          getEthDepositContract(),
          {}
        );

        const enabled = await contract.methods.depositEnabled().call();
        setDepositEnabled(enabled);
      } catch (err: any) {}
    })();
  }, [updateFlag]);

  return {
    depositEnabled,
  };
}

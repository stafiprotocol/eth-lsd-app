import { useEffect, useState } from "react";
import { useWalletAccount } from "./useWalletAccount";
import { createWeb3, getEthWeb3 } from "utils/web3Utils";
import {
  getEthWithdrawContract,
  getEthWithdrawContractAbi,
} from "config/contract";

export function useEthWithdrawLimit() {
  const { metaMaskAccount } = useWalletAccount();

  const [withdrawLimitPerCycle, setWithdrawLimitPerCycle] = useState("");
  const [userWithdrawLimitPerCycle, setUserWithdrawLimitPerCycle] =
    useState("");
  const [totalWithdrawAmountAtCycle, setTotalWithdrawAmountAtCycle] =
    useState("");
  const [userWithdrawAmountAtCycle, setUserWithdrawAmountAtCycle] =
    useState("");

  useEffect(() => {
    if (metaMaskAccount) {
      (async () => {
        const web3 = createWeb3();
        const customWeb3 = getEthWeb3();
        const contract = new web3.eth.Contract(
          getEthWithdrawContractAbi(),
          getEthWithdrawContract(),
          {
            from: metaMaskAccount,
          }
        );
        const customContract = new customWeb3.eth.Contract(
          getEthWithdrawContractAbi(),
          getEthWithdrawContract(),
          {
            from: metaMaskAccount,
          }
        );

        (async () => {
          const currentWithdrawCycle = await contract.methods
            .currentWithdrawCycle()
            .call()
            .catch((err: any) => {});
          // console.log("currentWithdrawCycle", currentWithdrawCycle);

          const req1 = (async () => {
            try {
              // console.log("currentWithdrawCycle", currentWithdrawCycle);
              // console.log("req1");
              const withdrawLimitPerCycle = await contract.methods
                .withdrawLimitAmountPerCycle()
                .call()
                .catch((err: any) => {});
              // console.log("withdrawLimitPerCycle", withdrawLimitPerCycle);
              setWithdrawLimitPerCycle(
                web3.utils.fromWei(withdrawLimitPerCycle)
              );
            } catch (err: any) {}
          })();

          const req2 = (async () => {
            try {
              // console.log("req2");
              const userWithdrawLimitPerCycle = await contract.methods
                .userWithdrawLimitAmountPerCycle()
                .call()
                .catch((err: any) => {});
              // console.log("userWithdrawLimitPerCycle", userWithdrawLimitPerCycle);
              setUserWithdrawLimitPerCycle(
                web3.utils.fromWei(userWithdrawLimitPerCycle)
              );
            } catch (err: any) {}
          })();

          const req3 = (async () => {
            try {
              // console.log("req3");
              const totalWithdrawAmountAtCycle = await contract.methods
                .totalWithdrawAmountAtCycle(currentWithdrawCycle)
                .call()
                .catch((err: any) => {});
              // console.log(
              //   "totalWithdrawAmountAtCycle",
              //   totalWithdrawAmountAtCycle
              // );
              setTotalWithdrawAmountAtCycle(
                web3.utils.fromWei(totalWithdrawAmountAtCycle)
              );
            } catch (err: any) {}
          })();

          const req4 = (async () => {
            try {
              // console.log("req4");
              const userWithdrawAmountAtCycle = await contract.methods
                .userWithdrawAmountAtCycle(
                  metaMaskAccount,
                  currentWithdrawCycle
                )
                .call()
                .catch((err: any) => {});
              // console.log("userWithdrawAmountAtCycle", userWithdrawAmountAtCycle);
              setUserWithdrawAmountAtCycle(
                web3.utils.fromWei(userWithdrawAmountAtCycle)
              );
            } catch (err: any) {}
          })();

          await Promise.all([req1, req2, req3, req4]);
        })();

        (async () => {
          const currentWithdrawCycle = await customContract.methods
            .currentWithdrawCycle()
            .call()
            .catch((err: any) => {});
          // console.log("custom currentWithdrawCycle", currentWithdrawCycle);

          const req1 = (async () => {
            // console.log("custom req1");
            const withdrawLimitPerCycle = await customContract.methods
              .withdrawLimitAmountPerCycle()
              .call()
              .catch((err: any) => {});
            // console.log("custom withdrawLimitPerCycle", withdrawLimitPerCycle);
            setWithdrawLimitPerCycle(web3.utils.fromWei(withdrawLimitPerCycle));
          })();

          const req2 = (async () => {
            // console.log("custom req2");
            const userWithdrawLimitPerCycle = await customContract.methods
              .userWithdrawLimitAmountPerCycle()
              .call()
              .catch((err: any) => {});
            // console.log(
            //   "custom userWithdrawLimitPerCycle",
            //   userWithdrawLimitPerCycle
            // );
            setUserWithdrawLimitPerCycle(
              web3.utils.fromWei(userWithdrawLimitPerCycle)
            );
          })();

          const req3 = (async () => {
            // console.log("custom req3");
            const totalWithdrawAmountAtCycle = await customContract.methods
              .totalWithdrawAmountAtCycle(currentWithdrawCycle)
              .call()
              .catch((err: any) => {});
            // console.log(
            //   "custom totalWithdrawAmountAtCycle",
            //   totalWithdrawAmountAtCycle
            // );
            setTotalWithdrawAmountAtCycle(
              web3.utils.fromWei(totalWithdrawAmountAtCycle)
            );
          })();

          const req4 = (async () => {
            // console.log("custom req4");
            const userWithdrawAmountAtCycle = await customContract.methods
              .userWithdrawAmountAtCycle(metaMaskAccount, currentWithdrawCycle)
              .call()
              .catch((err: any) => {});
            // console.log(
            //   "custom userWithdrawAmountAtCycle",
            //   userWithdrawAmountAtCycle
            // );
            setUserWithdrawAmountAtCycle(
              web3.utils.fromWei(userWithdrawAmountAtCycle)
            );
          })();

          await Promise.all([req1, req2, req3, req4]);
        })();
      })();
    }
  }, [metaMaskAccount]);

  return {
    withdrawLimitPerCycle,
    userWithdrawLimitPerCycle,
    totalWithdrawAmountAtCycle,
    userWithdrawAmountAtCycle,
  };
}

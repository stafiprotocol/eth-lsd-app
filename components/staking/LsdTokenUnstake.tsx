import { Icomoon } from "components/icon/Icomoon";
import { getEthereumChainId, getEthereumChainName } from "config/env";
import { useAppDispatch, useAppSelector } from "hooks/common";
import { useEthWithdrawLimit } from "hooks/useEthWithdrawLimit";
import { useBalance } from "hooks/useBalance";
import { usePrice } from "hooks/usePrice";
import { useWalletAccount } from "hooks/useWalletAccount";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { handleLsdEthUnstake } from "redux/reducers/EthSlice";
import { updateLsdEthBalance } from "redux/reducers/LsdEthSlice";
import { connectMetaMask } from "redux/reducers/WalletSlice";
import { RootState } from "redux/store";
import { openLink } from "utils/commonUtils";
import { formatLargeAmount, formatNumber } from "utils/numberUtils";
import Web3 from "web3";
import { CustomButton } from "../common/CustomButton";
import { CustomNumberInput } from "../common/CustomNumberInput";
import { DataLoading } from "../common/DataLoading";
import {
  getLsdEthName,
  getUnstakeDuration,
  getUnstakeTipLink,
} from "utils/configUtils";
import Image from "next/image";
import { getLsdEthIcon } from "utils/iconUtils";
import { useLsdEthRate } from "hooks/useLsdEthRate";
import { useApr } from "hooks/useApr";
import { useAppSlice } from "hooks/selector";

export const LsdTokenUnstake = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSlice();

  const { metaMaskAccount, metaMaskChainId } = useWalletAccount();
  const { balance } = useBalance();
  const { ethPrice, lsdEthPrice, gasPrice } = usePrice();
  const lsdEthRate = useLsdEthRate();

  const { lsdBalance } = useBalance();

  const { apr } = useApr();
  const {
    userWithdrawAmountAtCycle,
    withdrawLimitPerCycle,
    userWithdrawLimitPerCycle,
    totalWithdrawAmountAtCycle,
  } = useEthWithdrawLimit();

  const [unstakeAmount, setUnstakeAmount] = useState("");

  const { unstakeLoading } = useAppSelector((state: RootState) => {
    return {
      unstakeLoading: state.app.unstakeLoading,
    };
  });

  const walletNotConnected = useMemo(() => {
    return !metaMaskAccount;
  }, [metaMaskAccount]);

  const availableBalance = useMemo(() => {
    if (walletNotConnected) {
      return "--";
    }
    return lsdBalance;
  }, [lsdBalance, walletNotConnected]);

  const isWrongMetaMaskNetwork = useMemo(() => {
    return Number(metaMaskChainId) !== getEthereumChainId();
  }, [metaMaskChainId]);

  const unstakeValue = useMemo(() => {
    if (
      !unstakeAmount ||
      isNaN(Number(unstakeAmount)) ||
      Number(unstakeAmount) === 0 ||
      isNaN(Number(lsdEthPrice))
    ) {
      return undefined;
    }
    return Number(unstakeAmount) * Number(lsdEthPrice);
  }, [unstakeAmount, lsdEthPrice]);

  const estimateFee = useMemo(() => {
    let gasLimit = 261659;
    if (isNaN(Number(gasPrice))) {
      return "--";
    }

    return Web3.utils.fromWei(
      Web3.utils
        .toBN(gasLimit)
        .mul(Web3.utils.toBN(Number(gasPrice)))
        .toString()
    );
  }, [gasPrice]);

  const redeemFee = useMemo(() => {
    return "0";
  }, []);

  const willReceiveAmount = useMemo(() => {
    if (
      isNaN(Number(unstakeAmount)) ||
      isNaN(Number(lsdEthRate)) ||
      Number(unstakeAmount) === 0
    ) {
      return "--";
    }
    return Number(unstakeAmount) * Number(lsdEthRate) - Number(redeemFee) + "";
  }, [unstakeAmount, lsdEthRate, redeemFee]);

  const estimateCostValue = useMemo(() => {
    if (isNaN(Number(ethPrice)) || isNaN(Number(estimateFee))) {
      return "--";
    }
    return Number(ethPrice) * Number(estimateFee);
  }, [ethPrice, estimateFee]);

  const [buttonDisabled, buttonText, isButtonSecondary] = useMemo(() => {
    if (walletNotConnected) {
      return [false, "Connect Wallet"];
    }
    if (isWrongMetaMaskNetwork) {
      return [
        false,
        `Wrong network, click to change into ${getEthereumChainName()}`,
        true,
      ];
    }

    if (
      !unstakeAmount ||
      isNaN(Number(unstakeAmount)) ||
      Number(unstakeAmount) === 0 ||
      isNaN(Number(availableBalance))
    ) {
      return [true, "Unstake"];
    }

    if (Number(unstakeAmount) > Number(availableBalance)) {
      return [true, `Not Enough ${getLsdEthName()} to Unstake`];
    }

    if (
      (isNaN(Number(estimateFee)) ? 0 : Number(estimateFee) * 1.4) >
      Number(balance)
    ) {
      return [true, `Not Enough ETH for Fee`];
    }

    if (Number(unstakeAmount) > Number(userWithdrawLimitPerCycle)) {
      return [true, "Daily unstaking Limit Reached"];
    }
    if (
      Number(unstakeAmount) + Number(totalWithdrawAmountAtCycle) >
        Number(withdrawLimitPerCycle) ||
      Number(unstakeAmount) + Number(userWithdrawAmountAtCycle) >
        Number(userWithdrawLimitPerCycle)
    ) {
      return [true, "Daily unstaking Limit Reached"];
    }

    return [false, "Unstake"];
  }, [
    isWrongMetaMaskNetwork,
    availableBalance,
    unstakeAmount,
    walletNotConnected,
    estimateFee,
    balance,
    userWithdrawAmountAtCycle,
    totalWithdrawAmountAtCycle,
    withdrawLimitPerCycle,
    userWithdrawLimitPerCycle,
  ]);

  const newRTokenBalance = useMemo(() => {
    if (isNaN(Number(availableBalance))) {
      return "--";
    }
    if (isNaN(Number(unstakeAmount))) {
      return "--";
    }
    return Number(availableBalance) - Number(unstakeAmount) + "";
  }, [availableBalance, unstakeAmount]);

  const resetState = () => {
    setUnstakeAmount("");
  };

  const clickConnectWallet = () => {
    dispatch(connectMetaMask(getEthereumChainId()));
  };

  const clickMax = () => {
    if (
      isWrongMetaMaskNetwork ||
      walletNotConnected ||
      isNaN(Number(availableBalance))
    ) {
      return;
    }
    setUnstakeAmount(
      formatNumber(availableBalance, {
        toReadable: false,
        withSplit: false,
      })
    );
  };

  const jumpToWithdraw = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        tab: "withdraw",
      },
    });
  };

  const clickUnstake = () => {
    // Connect Wallet
    if (walletNotConnected || isWrongMetaMaskNetwork) {
      clickConnectWallet();
      return;
    }

    dispatch(
      handleLsdEthUnstake(
        unstakeAmount,
        willReceiveAmount,
        newRTokenBalance,
        false,
        (success, needWithdraw) => {
          dispatch(updateLsdEthBalance());
          if (success) {
            resetState();
            if (needWithdraw) {
              jumpToWithdraw();
            }
          }
        }
      )
    );
  };

  return (
    <div>
      <div
        className="cursor-pointer h-[.56rem] mt-[.18rem] mx-[.24rem] bg-[#6C86AD14] dark:bg-[#6C86AD50] rounded-[.16rem] flex items-center justify-between pl-[.12rem] pr-[.18rem]"
        onClick={() => {
          openLink(getUnstakeTipLink());
        }}
      >
        <div className="flex items-center">
          <Icomoon icon="tip" size=".2rem" />

          <div className="ml-[.06rem] text-color-text2 text-[.14rem]">
            Unstaking may take around{" "}
            <span className="text-color-text1">{getUnstakeDuration()}</span>.
            After that, withdraw function will open
          </div>
        </div>

        <Icomoon icon="right" color="#6C86AD" size=".11rem" />
      </div>

      <div className="h-[1.07rem] mt-[.18rem] pt-[.24rem] mx-[.24rem] bg-color-bgPage rounded-[.3rem]">
        <div className="mx-[.12rem] flex items-start">
          <div className="h-[.42rem] bg-color-bg2 rounded-[.3rem] flex items-center cursor-pointer">
            <div className="ml-[.08rem] flex items-center">
              <div className="w-[.34rem] h-[.34rem] relative">
                <Image src={getLsdEthIcon()} alt="logo" layout="fill" />
              </div>

              <div className="text-color-text1 text-[.16rem] ml-[.16rem]">
                {getLsdEthName()}
              </div>
            </div>

            <div className="ml-[.16rem] mr-[.16rem]">
              <Icomoon icon="arrow-down" size=".1rem" color="#848B97" />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-start pl-[.14rem]">
            <div className="flex items-center h-[.42rem]">
              <CustomNumberInput
                value={unstakeAmount}
                handleValueChange={setUnstakeAmount}
                fontSize=".24rem"
                placeholder="Amount"
              />
              <div>
                <CustomButton
                  type="stroke"
                  width=".63rem"
                  height=".36rem"
                  fontSize=".16rem"
                  className="bg-color-bg1 border-color-border1"
                  onClick={clickMax}
                  border={`0.01rem solid ${darkMode ? "#6C86AD80" : "#ffffff"}`}
                >
                  Max
                </CustomButton>
              </div>
            </div>

            <div className="mt-[.1rem] flex items-center justify-between text-[.14rem]">
              <div className="text-color-text2">
                {unstakeValue
                  ? `$${formatNumber(unstakeValue, { decimals: 2 })}`
                  : ""}{" "}
              </div>

              <div className="flex items-center">
                <div className="text-color-text2">Balance</div>
                <div className="ml-[.06rem] text-color-text1">
                  {formatNumber(availableBalance)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomButton
        loading={unstakeLoading}
        disabled={buttonDisabled}
        mt=".18rem"
        className="mx-[.24rem]"
        height=".56rem"
        onClick={clickUnstake}
        type={isButtonSecondary ? "secondary" : "primary"}
        border="none"
      >
        <div className="flex items-center">
          {buttonText}

          {(buttonText.indexOf("Wrong network") >= 0 ||
            buttonText.indexOf("Insufficient FIS.") >= 0) && (
            <div className="ml-[.12rem] flex items-center">
              <Icomoon icon="arrow-right" size=".12rem" color="#222C3C" />
            </div>
          )}
        </div>
      </CustomButton>

      <div
        className="mt-[.24rem] grid items-stretch font-[500] mx-[.75rem]"
        style={{ gridTemplateColumns: "40% 30% 30%" }}
      >
        <div className="flex justify-start ml-[.18rem]">
          <div className="flex flex-col items-center">
            <div className="text-text2/50 dark:text-text2Dark/50 text-[.14rem]">
              Will Receive
            </div>
            <div className="mt-[.1rem] text-color-text2 text-[.16rem]">
              {formatLargeAmount(willReceiveAmount)} ETH
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-text2/50 dark:text-text2Dark/50 text-[.14rem]">
            APR
          </div>

          {apr !== undefined ? (
            <div className="mt-[.1rem] text-color-text2 text-[.16rem]">
              {formatNumber(apr, { decimals: 2, toReadable: false })}%
            </div>
          ) : (
            <div className="mt-[.1rem]">
              <DataLoading height=".32rem" />
            </div>
          )}
        </div>

        <div className="flex justify-end mr-[.0rem]">
          <div className="flex flex-col items-center">
            <div className="text-text2/50 dark:text-text2Dark/50 text-[.14rem]">
              Est. Cost
            </div>

            <div className="mt-[.1rem] text-color-text2 text-[.16rem]">
              ${formatNumber(estimateCostValue, { decimals: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

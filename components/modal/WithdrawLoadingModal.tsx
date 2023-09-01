import { Box, Modal } from "@mui/material";
import classNames from "classnames";
import { PrimaryLoading } from "components/common/PrimaryLoading";
import { Icomoon } from "components/icon/Icomoon";
import { useAppDispatch, useAppSelector } from "hooks/common";
import Image from "next/image";
import successIcon from "public/images/tx_success.png";
import errorIcon from "public/images/tx_error.png";
import {
  setWithdrawLoadingParams,
  updateWithdrawLoadingParams,
} from "redux/reducers/AppSlice";
import { RootState } from "redux/store";
import { formatNumber } from "utils/numberUtils";
import { roboto } from "config/font";

export const WithdrawLoadingModal = () => {
  const dispatch = useAppDispatch();

  const { withdrawLoadingParams, darkMode } = useAppSelector(
    (state: RootState) => {
      return {
        withdrawLoadingParams: state.app.withdrawLoadingParams,
        darkMode: state.app.darkMode,
      };
    }
  );

  const closeModal = () => {
    if (withdrawLoadingParams?.status !== "loading") {
      dispatch(setWithdrawLoadingParams(undefined));
    } else {
      dispatch(updateWithdrawLoadingParams({ modalVisible: false }));
    }
  };

  const clickRetry = () => {
    if (!withdrawLoadingParams) {
      return;
    }
  };

  return (
    <Modal
      open={withdrawLoadingParams?.modalVisible === true}
      onClose={closeModal}
      sx={{
        backgroundColor: "#0A131Bba",
      }}
    >
      <Box
        pt="0"
        pl=".36rem"
        pr=".36rem"
        pb="0.36rem"
        sx={{
          backgroundColor: darkMode ? "#38475D" : "#ffffff",
          width: "3.5rem",
          borderRadius: "0.16rem",
          outline: "none",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={classNames(
            "flex-1 flex flex-col items-center",
            darkMode ? "dark" : "",
            roboto.className
          )}
        >
          <div
            className="self-end mr-[-0.12rem] mt-[.24rem] cursor-pointer"
            onClick={closeModal}
          >
            <Icomoon
              icon="close"
              size=".16rem"
              color={darkMode ? "#FFFFFF80" : "#6C86AD80"}
            />
          </div>

          {withdrawLoadingParams?.status === "loading" && (
            <div className="mt-[.24rem] w-[.8rem] h-[.8rem]">
              <PrimaryLoading size=".8rem" />
            </div>
          )}

          {withdrawLoadingParams?.status === "success" && (
            <div className="mt-[.0rem] w-[.8rem] h-[.8rem] relative">
              <Image src={successIcon} layout="fill" alt="success" />
            </div>
          )}

          {withdrawLoadingParams?.status === "error" && (
            <div className="mt-[.0rem] w-[.8rem] h-[.8rem] relative">
              <Image
                src={errorIcon}
                layout="fill"
                alt="error"
                // style={{ color: "#FF52C4" }}
              />
            </div>
          )}

          <div
            className={classNames(
              "mt-[.24rem] text-[.24rem] text-color-text1 font-[700] text-center leading-tight"
            )}
          >
            {withdrawLoadingParams?.status === "success"
              ? `Withdraw ${formatNumber(withdrawLoadingParams.tokenAmount, {
                  roundMode: "floor",
                })} ETH success`
              : withdrawLoadingParams?.status === "error"
              ? "Withdraw Failed"
              : `You are now withdrawing ${formatNumber(
                  Number(withdrawLoadingParams?.tokenAmount),
                  { roundMode: "floor" }
                )} ETH`}
          </div>

          <div
            className={classNames(
              "mt-[.24rem] text-[.16rem] text-color-text2 text-center leading-tight"
            )}
          >
            {withdrawLoadingParams?.customMsg
              ? withdrawLoadingParams.customMsg
              : withdrawLoadingParams?.status === "success"
              ? `Withdrawing operation was successful.`
              : withdrawLoadingParams?.status === "error"
              ? withdrawLoadingParams?.customMsg ||
                "Something went wrong, please try again"
              : `Withdraw ${formatNumber(withdrawLoadingParams?.tokenAmount, {
                  roundMode: "floor",
                })} ETH`}
          </div>

          <div className="mt-[.24rem] flex flex-col items-center">
            {withdrawLoadingParams?.scanUrl && (
              <a
                className="flex items-center"
                href={withdrawLoadingParams?.scanUrl || ""}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-color-link text-[.16rem] mr-[.12rem] font-[500]">
                  View on explorer
                </span>

                <Icomoon
                  icon="right"
                  size=".12rem"
                  color={darkMode ? "#ffffff" : "#5A5DE0"}
                />
              </a>
            )}

            {withdrawLoadingParams?.status === "error" && (
              <div
                className="text-color-link text-[.16rem] cursor-pointer"
                onClick={clickRetry}
              >
                Retry
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

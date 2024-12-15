import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect } from "react";
import stakeIcon from "public/images/notice/notice_stake.svg";
import unstakeIcon from "public/images/notice/notice_unstake.svg";
import withdrawIcon from "public/images/notice/notice_withdraw.svg";
import {
  LocalNotice,
  NoticeStakeData,
  NoticeUnstakeData,
  NoticeWithdrawData,
} from "utils/noticeUtils";
import { formatNumber } from "utils/numberUtils";
import { formatDate } from "utils/timeUtils";
import { useAppDispatch, useAppSelector } from "hooks/common";
import { RootState } from "redux/store";
import {
  setStakeLoadingParams,
  updateNotice,
  updateStakeLoadingParams,
} from "redux/reducers/AppSlice";
import { openLink } from "utils/commonUtils";
import Image from "next/image";
import { useAppSlice } from "hooks/selector";
import { getLsdEthName, getTokenName } from "utils/configUtils";

export const NoticeItem = (props: {
  notice: LocalNotice;
  visible: boolean;
  onUpdate: () => void;
}) => {
  const { darkMode } = useAppSlice();
  const dispatch = useAppDispatch();
  const { notice, visible } = props;

  const stakeLoadingParams = useAppSelector((state: RootState) => state.app.stakeLoadingParams);

  useEffect(() => {
    if (visible) {
      if (notice.type === "Stake" && notice.status === "Pending") {
        if (dayjs().valueOf() - Number(notice.timestamp) > 3600000) {
          const noticeStakeLoadingParams = notice.stakeLoadingParams;
          if (!noticeStakeLoadingParams) {
            return;
          }
          // if (
          //   noticeStakeLoadingParams.progressDetail?.sending?.totalStatus ===
          //     "success" &&
          //   noticeStakeLoadingParams.progressDetail?.staking?.totalStatus ===
          //     "success" &&
          //   noticeStakeLoadingParams.progressDetail?.minting?.totalStatus ===
          //     "success" &&
          //   noticeStakeLoadingParams.progressDetail?.swapping?.totalStatus ===
          //     "loading"
          // ) {
          //   dispatch(
          //     updateNotice(notice.id, {
          //       status: "Confirmed",
          //       stakeLoadingParams: {
          //         ...noticeStakeLoadingParams,
          //         status: "success",
          //         // progressDetail: {
          //         //   ...noticeStakeLoadingParams.progressDetail,
          //         //   swapping: {
          //         //     totalStatus: "success",
          //         //   },
          //         // },
          //       },
          //     })
          //   );

          //   if (
          //     stakeLoadingParams &&
          //     stakeLoadingParams.noticeUuid === notice.id
          //   ) {
          //     dispatch(
          //       updateStakeLoadingParams({
          //         status: "success",
          //         // progressDetail: {
          //         //   swapping: {
          //         //     totalStatus: "success",
          //         //   },
          //         // },
          //       })
          //     );
          //   }
          // }
        }
      }
    }
  }, [dispatch, visible, notice, stakeLoadingParams]);

  const getNoticeIcon = (notice: LocalNotice): any => {
    switch (notice.type) {
      case "Stake":
        return stakeIcon;
      case "Unstake":
        return unstakeIcon;
      case "Withdraw":
        return withdrawIcon;
      default:
        return stakeIcon;
    }
  };

  const getNoticeStatus = (notice: LocalNotice): string => {
    switch (notice.status) {
      case "Confirmed":
        return "Succeed";
      case "Error":
        return "Failed";
      default:
        return notice.status;
    }
  };

  const getNoticeContent = (notice: LocalNotice): string => {
    try {
      let data;
      if (notice.type === "Stake") {
        data = notice.data as NoticeStakeData;
        return `Stake ${formatNumber(
          data.amount
        )} ${getTokenName()} from your Wallet to LSD Pool Contract, and receive ${formatNumber(
          data.willReceiveAmount
        )} ${getLsdEthName()}.`;
      }
      if (notice.type === "Unstake") {
        data = notice.data as NoticeUnstakeData;
        if (!data.needWithdraw) {
          return `Unstake ${formatNumber(
            data.amount
          )} ${getLsdEthName()} from LSD Pool Contract to your wallet, and receive ${formatNumber(
            data.willReceiveAmount
          )} ${getTokenName()}.`;
        } else {
          return `Unstake ${formatNumber(
            data.amount
          )} ${getLsdEthName()} from LSD Pool Contract to your wallet.`;
        }
      }
      if (notice.type === "Withdraw" || notice.type === "Validator Withdraw") {
        data = notice.data as NoticeWithdrawData;
        return `Withdraw ${formatNumber(data.tokenAmount)} ${getTokenName()}.`;
      }
    } catch (err: unknown) {}

    return "";
  };

  const getNoticeUrl = (notice: LocalNotice): string | undefined => {
    try {
      return notice.scanUrl;
      // let data;
      // if (notice.type === "Fee Station") {
      //   data = notice.data as NoticeFeeStationData;
      //   if (data.payTxHash) {
      //     return `${notice.explorerUrl}/tx/${data.payTxHash}`;
      //   }
      //   return `${notice.explorerUrl}/account/${notice.txDetail.address}`;
      // } else {
      //   return `${notice.explorerUrl}/tx/${notice.txDetail.transactionHash}`;
      // }
    } catch (err: unknown) {}

    return "";
  };

  const openStakeLoadingModal = (notice: LocalNotice) => {
    if (notice.stakeLoadingParams) {
      if (stakeLoadingParams) {
        if (
          notice.stakeLoadingParams.noticeUuid === stakeLoadingParams.noticeUuid
        ) {
          dispatch(
            updateStakeLoadingParams({
              modalVisible: true,
            })
          );
        } else {
          // snackbarUtil.warning(
          //   "A stake process is going on, please wait a moment."
          // );
        }
      } else {
        dispatch(
          setStakeLoadingParams({
            ...notice.stakeLoadingParams,
            modalVisible: true,
          })
        );
      }
    } else {
      // snackbarUtil.error("Missing data");
    }
  };

  const onClickItem = () => {
    if (notice.type === "Stake") {
      if (notice.status === "Error" || notice.status === "Cancelled") {
        openStakeLoadingModal(notice);
      } else {
        const noticeData = notice.data as NoticeStakeData;
        openLink(getNoticeUrl(notice));
      }
    } else if (notice.type === "Withdraw") {
      if (notice.status === "Confirmed") {
        openLink(getNoticeUrl(notice));
      }
    } else {
      openLink(getNoticeUrl(notice));
    }
  };

  return (
    <div className={classNames(darkMode ? "dark" : "")}>
      <div
        className={classNames(
          "cursor-pointer mt-[.08rem] p-[.16rem] bg-hover rounded-[.12rem]"
        )}
        onClick={() => {
          onClickItem();
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <div className="w-[.34rem] h-[.34rem] relative">
              <Image src={getNoticeIcon(notice)} alt="icon" layout="fill" />
            </div>

            <div className="ml-[.12rem] font-[700] text-color-text1 text-[.16rem]">
              {notice.type}
            </div>

            <div
              className={classNames(
                "ml-[.06rem] h-[.2rem] rounded-[.04rem] px-[.04rem] flex items-center text-[.12rem]",
                notice.status === "Confirmed"
                  ? "bg-bgSuccess text-text1 dark:text-white "
                  : notice.status === "Error"
                  ? "bg-[#FEA4FF80] text-error dark:text-white "
                  : "bg-text2/20 text-text1 dark:text-white "
              )}
            >
              {getNoticeStatus(notice)}
            </div>
          </div>

          <div className="text-text2 text-[.14rem] opacity-50">
            {formatDate(notice.timestamp || 0, "DD MMM HH:mm")}
          </div>
        </div>

        <div className="mt-[.1rem]">
          <div className="text-text2 text-[.14rem] leading-normal">
            {getNoticeContent(notice)}
          </div>
        </div>
      </div>
    </div>
  );
};

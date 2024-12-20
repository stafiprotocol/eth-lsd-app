import classNames from "classnames";
import { useMemo } from "react";
import { LsdTokenStake } from "./LsdTokenStake";
import { LsdTokenUnstake } from "./LsdTokenUnstake";
import { useRouter } from "next/router";
import styles from "styles/CustomButton.module.css";

export const StakePage = () => {
  const router = useRouter();

  const selectedTab = useMemo(() => {
    const tabParam = router.query.tab;
    if (tabParam) {
      switch (tabParam) {
        case "stake":
        case "unstake":
        case "trade":
        case "bridge":
        case "withdraw":
          return tabParam;
        default:
          return "stake";
      }
    }
    return "stake";
  }, [router.query]);

  const updateTab = (tab: string) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        tab,
      },
    });
  };

  return (
    <div className="g-border-pink rounded-[.2rem] box-border">
      <div className="g-bg-box  rounded-[inherit] overflow-hidden  pb-[.32rem] border border-white/5">
        <div className="h-[.64rem] grid items-stretch" style={{ gridTemplateColumns: "50% 50%" }}>
          <div
            className={classNames(
              "cursor-pointer flex items-center justify-center  text-[.16rem] text-color-text1 ",
              selectedTab === "stake" ? "font-[700] border-color-borderActive" : "border-color-border1",
              selectedTab === "stake" ? styles["selected-bg"] : ""
            )}
            onClick={() => {
              updateTab("stake");
            }}
          >
            Stake
          </div>

          <div
            className={classNames(
              "cursor-pointer flex items-center justify-center  text-[.16rem] text-color-text1 ",
              selectedTab === "unstake" ? "font-[700] border-color-borderActive" : "border-color-border1",
              selectedTab === "unstake" ? styles["selected-bg"] : ""
            )}
            onClick={() => {
              updateTab("unstake");
            }}
          >
            Unstake
          </div>
        </div>

        {selectedTab === "stake" && <LsdTokenStake />}

        {selectedTab === "unstake" && <LsdTokenUnstake />}
      </div>
    </div>
  );
};

import { ReactNode, useEffect, useState } from "react";
import { Collapse } from "@mui/material";
import { Icomoon } from "components/icon/Icomoon";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "hooks/common";
import { RootState } from "redux/store";
import { setCollapseOpenId } from "redux/reducers/AppSlice";

type Props = React.PropsWithChildren<{
  id?: string;
  text: string;
  mt?: string;
}>;

export const FaqItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = props;
  const [collapsed, setCollapsed] = useState(false);

  const collapseOpenId = useAppSelector((state: RootState) => state.app.collapseOpenId);

  useEffect(() => {
    if (props.id && collapseOpenId === props.id) {
      setCollapsed(true);
      dispatch(setCollapseOpenId(undefined));
    }
  }, [collapseOpenId, props.id, dispatch]);

  return (
    <div className="g-bg-box rounded-[.08rem] border border-white/5 max-[1280px]:w-full w-[6.2rem]" id={id}>
      <div
        className="py-[.24rem] flex items-start justify-between px-[.24rem] cursor-pointer"
        style={{
          marginTop: props.mt || "0",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div
          className="text-color-text1 text-[.16rem] flex-1 leading-tight mr-[.12rem]"
          style={{
            maxLines: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
            lineClamp: 2,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {props.text}
        </div>

        <div className={classNames("mt-[.05rem] flex items-center", collapsed ? "rotate-90" : "")}>
          <Icomoon icon="right" size=".11rem" color="#fff" />
        </div>
      </div>

      {
        <Collapse in={collapsed}>
          <div className="mt-[.12rem] text-color-text2 text-[.15rem] pb-[.16rem] px-[.24rem] break-word leading-normal">
            {props.children}
          </div>
        </Collapse>
      }
    </div>
  );
};

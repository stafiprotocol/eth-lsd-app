import classNames from "classnames";

type Props = React.PropsWithChildren<{}>;

export const PageTitleContainer = (props: Props) => {
  return (
    <div
      className={classNames("flex justify-center items-center w-full")}
      style={{
        background: "linear-gradient(180deg, #f3dbff00 -20.69%, #e653ff20 103.45%)",
        boxShadow: "0px 1px 0px #c474ffa3 ",
      }}
    >
      <div className="w-full max-w-[1280px] flex flex-col">{props.children}</div>
    </div>
  );
};

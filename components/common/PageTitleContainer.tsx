import classNames from "classnames";

type Props = React.PropsWithChildren<{}>;

export const PageTitleContainer = (props: Props) => {
  return (
    <div
      className={classNames("flex justify-center items-center h-[1.16rem]")}
      style={{
        background: "linear-gradient(180deg, #f3dbff00 -20.69%, #e653ff20 103.45%)",
        boxShadow: "0px 1px 0px #c474ffa3 ",
      }}
    >
      <div className="w-smallContentW xl:w-contentW 2xl:w-largeContentW flex flex-col">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

import { useSnackbar, VariantType } from "notistack";
import React from "react";

interface IProps {
  setUseSnackbarRef: (showSnackbar: any) => void;
}

const InnerSnackbarUtilsConfigurator: React.FC<IProps> = (props: IProps) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef: any;
const setUseSnackbarRef = (useSnackbarRefProp: any) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  );
};

const snackbarUtil = {
  success(msg: string) {
    this.toast(msg, "success");
  },
  warning(msg: string) {
    this.toast(msg, "warning");
  },
  info(msg: string) {
    this.toast(msg, "info");
  },
  error(msg: string) {
    this.toast(msg, "error");
  },
  toast(msg: string, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};

export default snackbarUtil;

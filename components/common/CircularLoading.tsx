import { CircularProgress } from "@mui/material";

interface CustomLoadingProps {
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
    | undefined;
  size: string;
}

export const CircularLoading = (props: CustomLoadingProps) => {
  return <CircularProgress size={props.size} color={props.color} />;
};

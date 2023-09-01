import { Skeleton } from "@mui/material";
import { useAppSelector } from "hooks/common";
import { RootState } from "redux/store";

interface Props {
  height: string;
}

export const DataLoading = (props: Props) => {
  const { height } = props;
  const { darkMode } = useAppSelector((state: RootState) => {
    return { darkMode: state.app.darkMode };
  });

  return (
    <div className="min-w-[0.5rem]">
      <Skeleton
        variant="rounded"
        animation="pulse"
        height={height}
        sx={{
          fontSize: height,
          bgcolor: darkMode ? "grey.900" : "grey.100",
        }}
      />
    </div>
  );
};

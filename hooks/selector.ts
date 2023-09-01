import { RootState } from "redux/store";
import { useAppSelector } from "./common";

export function useAppSlice() {
  const { darkMode, updateFlag } = useAppSelector((state: RootState) => {
    return {
      darkMode: state.app.darkMode,
      updateFlag: state.app.updateFlag,
    };
  });

  return { darkMode, updateFlag };
}

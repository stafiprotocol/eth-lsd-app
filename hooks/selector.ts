import { RootState } from "redux/store";
import { useAppSelector } from "./common";

export function useAppSlice() {
  const { darkMode, updateFlag, unreadNoticeFlag } = useAppSelector(
    (state: RootState) => {
      return {
        darkMode: state.app.darkMode,
        updateFlag: state.app.updateFlag,
        unreadNoticeFlag: state.app.unreadNoticeFlag,
      };
    }
  );

  return { darkMode, updateFlag, unreadNoticeFlag };
}

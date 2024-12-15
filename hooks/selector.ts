import { RootState } from "redux/store";
import { useAppSelector } from "./common";

export function useAppSlice() {
  const darkMode = useAppSelector((state: RootState) => state.app.darkMode)
  const updateFlag = useAppSelector((state: RootState) => state.app.updateFlag)
  const unreadNoticeFlag = useAppSelector((state: RootState) => state.app.unreadNoticeFlag)

  return { darkMode, updateFlag, unreadNoticeFlag };
}

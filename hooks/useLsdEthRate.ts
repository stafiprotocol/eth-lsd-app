import { useEffect } from "react";
import { updateLsdEthRate } from "redux/reducers/LsdEthSlice";
import { RootState } from "redux/store";
import { useAppDispatch, useAppSelector } from "./common";
import { useAppSlice } from "./selector";

export function useLsdEthRate() {
  const dispatch = useAppDispatch();
  const { updateFlag } = useAppSlice();

  const lsdEthRate = useAppSelector((state: RootState) => state.lsdEth.rate);

  useEffect(() => {
    dispatch(updateLsdEthRate());
  }, [dispatch, lsdEthRate, updateFlag]);

  return lsdEthRate;
}

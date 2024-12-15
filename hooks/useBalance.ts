import { useEffect } from "react";
import { updateLsdEthBalance } from "redux/reducers/LsdEthSlice";
import { RootState } from "redux/store";
import { useAppDispatch, useAppSelector } from "./common";
import { useAppSlice } from "./selector";

export function useBalance() {
  const { updateFlag } = useAppSlice();
  const dispatch = useAppDispatch();

  const balance = useAppSelector((state: RootState) => state.eth.balance)
  const lsdBalance = useAppSelector((state: RootState) => state.lsdEth.balance)

  useEffect(() => {
    if (updateFlag) {
      dispatch(updateLsdEthBalance());
    }
  }, [dispatch, updateFlag]);

  return {
    balance,
    lsdBalance,
  };
}

import { useEffect } from "react";
import { updateLsdEthBalance } from "redux/reducers/LsdEthSlice";
import { RootState } from "redux/store";
import { useAppDispatch, useAppSelector } from "./common";
import { useAppSlice } from "./selector";

export function useBalance() {
  const { updateFlag } = useAppSlice();
  const dispatch = useAppDispatch();

  const { balance, lsdBalance } = useAppSelector((state: RootState) => {
    return {
      balance: state.eth.balance,
      lsdBalance: state.lsdEth.balance,
    };
  });

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

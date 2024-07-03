import { useCallback, useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import { useAppSlice } from "./selector";

export function useGasPrice() {
  const { updateFlag } = useAppSlice();

  const [gasPrice, setGasPrice] = useState(0);

  const fetchGasPrice = useCallback(async () => {
    try {
      const web3 = getEthWeb3();

      const gasPrice = await web3.eth.getGasPrice();

      // console.log({ gasPrice });
      setGasPrice(Number(gasPrice));
    } catch (err: any) {}
  }, []);

  useEffect(() => {
    fetchGasPrice();
  }, [updateFlag]);

  return {
    gasPrice,
  };
}

import { useCallback, useEffect, useState } from "react";
import { getGasPriceUrl } from "utils/configUtils";
import { useAppSlice } from "./selector";

export function usePrice() {
  const { updateFlag } = useAppSlice();

  const [gasPrice, setGasPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  const fetchGasPrice = useCallback(async () => {
    try {
      const response = await fetch(getGasPriceUrl(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resJson = await response.json();
      if (resJson && resJson.code === 200) {
        const { standard, priceUSD } = resJson.data;
        setGasPrice(standard);
        setEthPrice(priceUSD);
      }
    } catch (err: any) {}
  }, []);

  useEffect(() => {
    fetchGasPrice();
  }, [updateFlag]);

  return {
    gasPrice,
    ethPrice,
    lsdEthPrice: 0,
  };
}

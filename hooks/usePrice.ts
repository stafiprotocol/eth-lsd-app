import { useCallback, useEffect, useState } from "react";
import { useAppSlice } from "./selector";
import { getTokenPriceUrl } from "utils/configUtils";

export function usePrice() {
  const { updateFlag } = useAppSlice();

  const [ethPrice, setEthPrice] = useState(0);

  const fetchGasPrice = useCallback(async () => {
    try {
      const response = await fetch(getTokenPriceUrl(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resJson = await response.json();
      if (resJson) {
        const { usd } = resJson["ethereum"];
        setEthPrice(usd);
      }
    } catch (err: any) {}
  }, []);

  useEffect(() => {
    fetchGasPrice();
  }, [fetchGasPrice]);

  return {
    ethPrice,
    lsdEthPrice: 0,
  };
}

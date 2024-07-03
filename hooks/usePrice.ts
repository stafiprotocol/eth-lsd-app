import { useCallback, useEffect, useState } from "react";
import { useAppSlice } from "./selector";
import { getTokenPriceUrl } from "utils/configUtils";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function usePrice() {
  const tokenPriceResult: UseQueryResult<number> = useQuery({
    queryKey: ["GetTokenPrice"],
    staleTime: 60000,
    initialData: 0,
    queryFn: async () => {
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
          return usd;
        }
      } catch (err: any) {}

      return 0;
    },
  });

  return {
    ethPrice: tokenPriceResult.data,
    lsdEthPrice: 0,
  };
}

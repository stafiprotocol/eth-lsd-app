import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getTokenPriceUrl } from "utils/configUtils";

export function usePrice() {
  const tokenPriceResult: UseQueryResult<number> = useQuery({
    queryKey: ["GetTokenPrice", getTokenPriceUrl()],
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
          const { usd } = resJson["pulsechain"];
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

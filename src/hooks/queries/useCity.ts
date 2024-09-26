import { useQuery } from "@tanstack/react-query";
import { getDemographics } from "api/services";
import type { City, Demographic } from "shared/types";

export function useGetDemographicsOfCity(city: City) {
  return useQuery<Demographic, Error>({
    queryKey: ["city", city],
    queryFn: () => getDemographics(city),
    staleTime: 120000,
    enabled: !!city,
  });
}

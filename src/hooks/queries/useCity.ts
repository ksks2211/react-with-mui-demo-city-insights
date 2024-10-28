import { useQuery } from "@tanstack/react-query";
import { getDemographics, getIntro } from "api/services";
import type { City, DemographicsData, IntroData } from "shared/types";

export function useGetDemographicsOfCity(city: City) {
  return useQuery<DemographicsData, Error>({
    queryKey: ["demo", city],
    queryFn: () => getDemographics(city),
    staleTime: Infinity,
    enabled: !!city,
  });
}

export function useGetIntroOfCity(city: City) {
  return useQuery<IntroData, Error>({
    queryKey: ["intro", city],
    queryFn: () => getIntro(city),
    staleTime: Infinity,
    enabled: !!city,
  });
}

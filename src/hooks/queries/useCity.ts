import { useQuery } from "@tanstack/react-query";
import { getDemographics, getIntro } from "api/services";
import type { City, Demographic, IntroData } from "shared/types";

export function useGetDemographicsOfCity(city: City) {
  return useQuery<Demographic, Error>({
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

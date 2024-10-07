import { findRegionByCity } from "@utils/arrayUtils";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CITIES } from "shared/constants";
import { City } from "shared/types";

export const useSelectedRegion = () => {
  const [searchParams] = useSearchParams();
  const continent = searchParams.get("continent");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [continent]);

  return continent !== null ? continent : undefined;
};

function isValidCity(city: string | undefined): city is City {
  return city !== undefined && CITIES.includes(city);
}

export const useSelectedCity = () => {
  const { city } = useParams();

  if (!isValidCity(city)) {
    return { city: undefined, region: undefined };
  }

  const region = findRegionByCity(city) as string;

  return { city, region };
};

import { useGetMenu } from "hooks/queries/useMenu";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CITIES } from "shared/constants";
import { City, Menu } from "shared/types";

export const useSelectedRegion = () => {
  const [searchParams] = useSearchParams();
  const continent = searchParams.get("continent");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [continent]);

  return continent !== null ? continent : undefined;
};

function isValidCity(city: string | undefined): city is City {
  return city !== undefined && CITIES.includes(city as City);
}

export function findRegionFromCity(name: string, data?: Menu) {
  if (!data) return null;

  for (const region of data) {
    for (const city of region.items) {
      if (city.title === name) {
        return region.title;
      }
    }
  }
  return null;
}
export const useSelectedCity = () => {
  const { city } = useParams();
  if (isValidCity(city)) {
    return { city };
  }

  return { city: undefined };
};

export const useSelectedCityWithRegion = () => {
  const { city } = useSelectedCity();
  const { data } = useGetMenu();

  if (!isValidCity(city)) {
    return { city: undefined, region: undefined };
  }

  const region = findRegionFromCity(city, data);

  if (!region) {
    return { city: undefined, region: undefined };
  }

  return { city, region };
};

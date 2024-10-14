import { CITIES } from "shared/constants";
import type { City } from "../shared/types";

type Endpoints = Record<
  City,
  { getCityDemographics: string; getCityIntro: string }
>;

function generateEndPoints() {
  const endpoints: Endpoints = {};
  for (const city of CITIES) {
    endpoints[city] = {
      getCityDemographics: `/${city}/demographics.json`,
      getCityIntro: `/${city}/intro.json`,
    };
  }
  return endpoints;
}

const cityEndpoints = generateEndPoints();
const menuEndpoint = { getMenu: "/menu.json" };

export { cityEndpoints, menuEndpoint };

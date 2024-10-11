import { CITIES } from "shared/constants";
import type { City } from "../shared/types";

type ENDPOINTS_TYPE_BEFORE = {
  [key in City]?: { getCityDemographics: string };
};

type ENDPOINTS_TYPE = { [key in City]: { getCityDemographics: string } };

function generateEndPoints() {
  const endpoints: ENDPOINTS_TYPE_BEFORE = {};
  for (const city of CITIES) {
    endpoints[city] = {
      getCityDemographics: `/${city}/demographics.json`,
    };
  }

  return endpoints as ENDPOINTS_TYPE;
}

const demoEndpoints = generateEndPoints();
const menuEndpoint = { getMenu: "/menu.json" };

export { demoEndpoints, menuEndpoint };

import type { City, DemographicsData, IntroData, Menu } from "shared/types";
import apiClient from "./client";
import { cityEndpoints, menuEndpoint } from "./endpoints";

async function getData<T>(endpoint: string) {
  try {
    const { data } = await apiClient.get(endpoint);
    return data as T;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.error(error);

    throw new Error(message);
  }
}

export async function getDemographics(city: City) {
  const endpoint = cityEndpoints[city].getCityDemographics;
  return await getData<DemographicsData>(endpoint);
}

export async function getIntro(city: City) {
  const endpoint = cityEndpoints[city].getCityIntro;
  return await getData<IntroData>(endpoint);
}

export async function getMenu() {
  const endpoint = menuEndpoint.getMenu;
  return await getData<Menu>(endpoint);
}

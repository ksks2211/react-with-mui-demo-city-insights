import type { City, Demographic, IntroData, Menu } from "shared/types";
import apiClient from "./client";
import { cityEndpoints, menuEndpoint } from "./endpoints";

export async function getDemographics(city: City) {
  const endpoint = cityEndpoints[city].getCityDemographics;

  try {
    const { data } = await apiClient.get(endpoint);
    return data as Demographic;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.error(error);

    throw new Error(message);
  }
}

export async function getIntro(city: City) {
  const endpoint = cityEndpoints[city].getCityIntro;

  try {
    const { data } = await apiClient.get(endpoint);

    return data as IntroData;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.error(error);

    throw new Error(message);
  }
}

export async function getMenu() {
  const endpoint = menuEndpoint.getMenu;

  try {
    const { data } = await apiClient.get(endpoint);
    return data as Menu;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.error(error);

    throw new Error(message);
  }
}

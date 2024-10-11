import type { City, Demographic, Menu } from "shared/types";
import apiClient from "./client";
import { demoEndpoints, menuEndpoint } from "./endpoints";

export async function getDemographics(city: City) {
  const endpoint = demoEndpoints[city].getCityDemographics;

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

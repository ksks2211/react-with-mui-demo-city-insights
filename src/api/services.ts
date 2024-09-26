import type { City, Demographic } from "shared/types";
import apiClient from "./client";
import { ENDPOINTS } from "./endpoints";

export async function getDemographics(city: City) {
  const endpoint = ENDPOINTS[city].getCityDemographics;

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

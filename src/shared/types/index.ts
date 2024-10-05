import { CITIES } from "shared/constants";

export interface Demographic {
  populations: [{ Year: number; Population: number }];
}

export type City = (typeof CITIES)[number];
export type TargetedEvent = { currentTarget: EventTarget & HTMLElement };

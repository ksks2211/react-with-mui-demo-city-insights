import { CITIES } from "shared/constants";

export interface Demographic {
  populations: [{ Year: number; Population: number }];
}

export type City = (typeof CITIES)[number];
export type TargetedEvent = { currentTarget: EventTarget & HTMLElement };

export type SubMenuItem = {
  title: string;
  link: string;
  continent: string;
  img: string;
};

export type MainMenuItem = {
  title: string;
  link: string;
  items: SubMenuItem[];
};

export type Menu = MainMenuItem[];

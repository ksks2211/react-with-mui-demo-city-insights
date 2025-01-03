import { CITIES } from "shared/constants";

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

export type Coordinates = {
  lon: number;
  lat: number;
};

export type IntroData = {
  description: string;
  coord: Coordinates;
};

export type DemographicsData = {
  demographics: [{ Year: number; Population: number }];
};

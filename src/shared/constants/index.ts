import { Menu } from "shared/types";

const CITIES = [
  "new-york",
  "london",
  "seoul",
  "paris",
  "toronto",
  "singapore",
  "hong-kong",
  "tokyo",
  "los-angeles",
  "sao-paulo",
] as const;

export { CITIES };

export type Region = Menu[number]; // 300 means .3s
export const TRANSITION_DURATION = 300;

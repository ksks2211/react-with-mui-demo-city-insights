import { City } from "shared/types";

export const introStyles = {
  display: "flex",
  flexDirection: { xs: "column", lg: "row-reverse" },
};
export const mapStyles = {
  width: { xs: "100%", lg: "50%" },
  padding: "1rem",
  display: "flex",
  alignItems: "center",
};
export const textStyles = {
  width: { xs: "100%", lg: "50%" },
  padding: "1rem",
};
export interface IntroProps {
  city: City;
}

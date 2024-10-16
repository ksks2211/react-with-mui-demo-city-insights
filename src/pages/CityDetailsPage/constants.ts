import { darken } from "polished";

export const MIN_HEIGHT = "300px" as const;

export const getSectionStyles = (size: string, accentColor: string) => {
  const isLarge = size === "lg";

  return {
    ".section-title": {
      fontSize: isLarge ? "1.65rem" : "1.25rem",
      fontWeight: isLarge ? 900 : 500,
      color: isLarge ? darken(0.05, accentColor) : undefined,
      span: {
        borderBottomWidth: isLarge ? 0 : "1px",
        fontFamily: isLarge ? "Roboto" : undefined,
      },
    },
  };
};

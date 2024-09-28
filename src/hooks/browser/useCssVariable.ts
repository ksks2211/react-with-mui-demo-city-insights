import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const DEFAULT_COLOR = "#ffffff00";

export const useCssVariableColor = (variableName: string) => {
  const [variableValue, setVariableValue] = useState(DEFAULT_COLOR);
  const theme = useTheme();

  useEffect(() => {
    // Access the CSS variable value
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(variableName);
    setVariableValue(value || DEFAULT_COLOR);
  }, [theme, variableName]); // Update whenever the theme changes

  return variableValue;
};

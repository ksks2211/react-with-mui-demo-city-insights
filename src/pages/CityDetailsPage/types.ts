import { BoxProps } from "@mui/system";

export interface SectionDividerHandle {
  moveTo: () => void;
  readTop: () => number;
  readBottom: () => number;
  getTitle: () => string;
}
export interface SectionDividerProps extends BoxProps {
  title: string;
  size?: "lg" | "md";
}

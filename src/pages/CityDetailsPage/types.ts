import { BoxProps } from "@mui/system";

export interface SectionDividerHandle {
  moveTo: () => void;
  readTopAndBottom: () => { top: number; bottom: number };
  getTitle: () => string;
}
export interface SectionDividerProps extends BoxProps {
  title: string;
  size?: "lg" | "md";
}

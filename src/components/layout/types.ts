import { orange } from "@mui/material/colors";
import { HTMLAttributes } from "react";

export const headerTypographyProps = {
  fontFamily: ["Fredoka"],
  fontSize: "1.6rem",
  fontWeight: "700",
  whiteSpace: "nowrap",
  color: orange[900],
  sx: { userSelect: "none", cursor: "pointer" },
};
export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  handleToggle: () => void;
  isLargeScreen: boolean;
} // interfaces

export interface NavbarProps {
  handleClose: () => void;
  isNavbarOpen: boolean;
}

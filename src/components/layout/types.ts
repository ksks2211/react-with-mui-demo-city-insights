import { HTMLAttributes } from "react";

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  handleToggle: () => void;
  isLargeScreen: boolean;
} // interfaces

export interface NavbarProps {
  handleClose: () => void;
  isNavbarOpen: boolean;
}

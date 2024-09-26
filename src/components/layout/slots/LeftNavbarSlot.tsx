import { Box, styled } from "@mui/material";
import { HTMLAttributes } from "react";

interface LeftNavbarSlotProps extends HTMLAttributes<HTMLDivElement> {
  isNavbarOpen: boolean;
}

const StyledNavbar = styled(Box)<{ "data-navbar-open": boolean }>`
  position: fixed;
  top: 0;

  height: 100vh;
  z-index: 100;

  overflow: auto;

  min-width: var(--sidebar-width);

  margin-left: calc(-1 * var(--sidebar-width));

  transform: ${(props) =>
    props["data-navbar-open"]
      ? "translateX(var(--sidebar-width))"
      : "translateX(0)"};

  transition: transform 0.3s ease-out;
`;

export default function LeftNavbarSlot({
  isNavbarOpen,
  children,
}: LeftNavbarSlotProps) {
  return (
    <StyledNavbar data-navbar-open={isNavbarOpen}>{children}</StyledNavbar>
  );
}

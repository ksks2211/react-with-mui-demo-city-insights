import { Box, styled } from "@mui/material";
import cn from "classnames";
import { HTMLAttributes } from "react";
interface LeftNavbarSlotProps extends HTMLAttributes<HTMLDivElement> {
  isNavbarOpen: boolean;
}

const StyledNavbar = styled(Box)`
  position: fixed;
  top: 0;

  height: 100vh;
  z-index: 100;

  overflow: auto;

  min-width: var(--sidebar-width);

  margin-left: calc(-1 * var(--sidebar-width));

  transform: translateX(0);

  &.navbar-open {
    transform: translateX(var(--sidebar-width));
  }

  transition: transform 0.3s ease-out;
`;

export default function LeftNavbarSlot({
  isNavbarOpen,
  children,
}: LeftNavbarSlotProps) {
  return (
    <StyledNavbar className={cn({ "navbar-open": isNavbarOpen })}>
      {children}
    </StyledNavbar>
  );
}

import { Box, styled } from "@mui/material";
import cn from "classnames";
import { HTMLAttributes, useEffect, useState } from "react";
import { useHeaderVisibility } from "../../../hooks/store/useLayoutState";

// constants
const THRESHOLD = 30;

interface HeaderSlotProps extends HTMLAttributes<HTMLDivElement> {
  isSmallScreen: boolean;
  scrollY: number;
}

const StyledHeaderSlot = styled(Box)`
  width: 100%;
  min-height: var(--header-height);

  position: sticky;
  top: 0;
  z-index: 10;

  transition: transform 0.3s ease-in-out, min-height 0.3s ease-out;

  transform: translateY(0);

  &.hidden-header {
    transform: translateY(calc(-1 * var(--header-height)));
  }
`;

// hooks
const useHideHeaderOnSmallScreen = (
  isSmallScreen: boolean,
  showHeader: () => void,
  hideHeader: () => void,
  scrollY: number,
  prevScrollY: number,
  setPrevScrollY: (scroll: number) => void
) => {
  useEffect(() => {
    // Don't hide header for large screen
    if (isSmallScreen === false) {
      showHeader();
      return;
    }

    // Hide Header
    if (window.innerHeight / 2 <= scrollY) {
      if (prevScrollY + THRESHOLD < scrollY) {
        hideHeader();
      } else if (prevScrollY - THRESHOLD > scrollY) {
        showHeader();
      }
    } else {
      showHeader();
    }
    setPrevScrollY(scrollY);
  }, [
    hideHeader,
    isSmallScreen,
    prevScrollY,
    scrollY,
    setPrevScrollY,
    showHeader,
  ]);
};

export default function HeaderSlot({
  isSmallScreen,
  scrollY,
  children,
}: HeaderSlotProps) {
  const { isHeaderVisible, showHeader, hideHeader } = useHeaderVisibility();

  const [prevScrollY, setPrevScrollY] = useState(scrollY);

  useHideHeaderOnSmallScreen(
    isSmallScreen,
    showHeader,
    hideHeader,
    scrollY,
    prevScrollY,
    setPrevScrollY
  );

  return (
    <StyledHeaderSlot className={cn({ "hidden-header": !isHeaderVisible })}>
      {children}
    </StyledHeaderSlot>
  );
}

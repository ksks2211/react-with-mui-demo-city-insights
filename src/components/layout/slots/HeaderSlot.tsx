import { Box, styled } from "@mui/material";
import { HTMLAttributes, useEffect, useState } from "react";
import { useHeaderVisibility } from "../../../hooks/store/useLayoutState";

interface HeaderSlotProps extends HTMLAttributes<HTMLDivElement> {
  isSmallScreen: boolean;
  scrollY: number;
}

interface StyledHeaderSlot {
  "data-header-visible": boolean;
}

const StyledHeaderSlot = styled(Box)<StyledHeaderSlot>`
  width: 100%;
  min-height: var(--header-height);

  position: sticky;
  top: 0;
  z-index: 10;

  transition: transform 0.3s ease-in-out, min-height 0.3s ease-out;

  transform: ${(props) =>
    props["data-header-visible"]
      ? "translateY(0)"
      : "translateY(calc(-1 * var(--header-height)))"};
`;

// constants
const THRESHOLD = 30;

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
    <StyledHeaderSlot data-header-visible={isHeaderVisible}>
      {children}
    </StyledHeaderSlot>
  );
}

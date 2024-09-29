import { Box, styled } from "@mui/material";
import ScrollTopBtn from "components/containers/ScrollTopBtn";
import { HTMLAttributes, useRef } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { largeScreenStyle } from "shared/theme";
import {
  useBreakpoints,
  useLockBodyScroll,
  useNavOpen,
  useOverlay,
  useScrollY,
} from "../../hooks";
import type Header from "./Header";
import Navbar from "./Navbar";
import Overlay from "./Overlay";
import {
  FooterSlot,
  HeaderSlot,
  LeftNavbarSlot,
  MainSlot,
  RightSidebarSlot,
} from "./slots";

// interfaces
interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  Header: typeof Header;
  Navbar: typeof Navbar;
}

// 300 means .3s
const TRANSITION_DURATION = 300;

const StyledLayoutWrapper = styled(Box)`
  --transition-duration: ${TRANSITION_DURATION}ms;
  position: relative;
  height: 100%;

  margin-right: 0;
  transition: 0s;

  .overlay-enter {
    opacity: 0;
  }
  .overlay-enter-active {
    opacity: 1;
    transition: opacity var(--transition-duration);
  }
  .overlay-exit {
    opacity: 1;
  }
  .overlay-exit-active {
    opacity: 0;
    transition: opacity var(--transition-duration);
  }
`;

const StyledLayout = styled(Box)<{ "data-small-screen": boolean }>`
  ${(props) => props["data-small-screen"] || largeScreenStyle}

  background-color: var(--background-color);
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  min-width: 300px;
`;

const ContentSlot = styled(Box)`
  background-color: var(--content-background);
  flex-grow: 1;
  display: flex;
  flex-flow: row;
  width: 100%;
`;
ContentSlot.displayName = "ContentSlot";

const Layout: React.FC<LayoutProps> = ({ Header, Navbar }) => {
  const { isDownMd: isSmallScreen, isXl: isLargeScreen } = useBreakpoints();
  const { isNavOpen, closeNav, openNav } = useNavOpen();
  const { isOverlayOpen, closeOverlay, openOverlay } = useOverlay();
  const { scrollY } = useScrollY();

  const overlayRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isNavOpen);

  const handleCloseNavbar = () => {
    closeNav();
    closeOverlay();
  };

  const handleToggle = () => {
    if (isNavOpen) {
      closeNav();
      closeOverlay();
    } else {
      openNav();
      openOverlay();
    }
  };

  return (
    <StyledLayoutWrapper>
      {/* overlay */}
      <CSSTransition
        in={isOverlayOpen}
        timeout={TRANSITION_DURATION}
        classNames="overlay"
        unmountOnExit
        nodeRef={overlayRef}
      >
        <Overlay onClick={handleCloseNavbar} overlayRef={overlayRef} />
      </CSSTransition>
      {/* Navbar */}
      <LeftNavbarSlot isNavbarOpen={isNavOpen}>
        <Navbar handleClose={handleCloseNavbar} />
      </LeftNavbarSlot>

      {/* main layout */}
      <StyledLayout data-small-screen={isSmallScreen}>
        {/* Header */}
        <HeaderSlot isSmallScreen={isSmallScreen} scrollY={scrollY}>
          <Header handleToggle={handleToggle} isLargeScreen={isLargeScreen} />
        </HeaderSlot>

        <ContentSlot>
          {/* Main Content */}
          <MainSlot isLargeScreen={isLargeScreen}>
            <Outlet />
          </MainSlot>

          {/* Right Sidebar  */}
          {!isSmallScreen && <RightSidebarSlot>right Sidebar</RightSidebarSlot>}
        </ContentSlot>

        {/* Footer */}
        <FooterSlot>footer</FooterSlot>
      </StyledLayout>

      <ScrollTopBtn />
    </StyledLayoutWrapper>
  );
};

export default Layout;

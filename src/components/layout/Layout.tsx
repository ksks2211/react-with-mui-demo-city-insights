import ScrollTopBtn from "components/containers/ScrollTopBtn";
import { lazy, useRef } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  useBreakpoints,
  useLockBodyScroll,
  useNavOpen,
  useOverlay,
  useScrollY,
} from "../../hooks";

import SuspenseLoader from "components/containers/SuspenseLoader.tsx";
import { TRANSITION_DURATION } from "shared/constants";
import Overlay from "./Overlay";
import {
  FooterSlot,
  HeaderSlot,
  LeftNavbarSlot,
  MainSlot,
  RightSidebarSlot,
} from "./slots";
import { ContentSlot, StyledLayout, StyledLayoutWrapper } from "./styled";
const Header = lazy(() => import("./Header.tsx"));
const Navbar = lazy(() => import("./Navbar.tsx"));
const Sidebar = lazy(() => import("./Sidebar/Sidebar.tsx"));
const Footer = lazy(() => import("./Footer.tsx"));

const Layout: React.FC = () => {
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
        <Overlay
          onClick={handleCloseNavbar}
          overlayRef={overlayRef}
          sx={{ cursor: "pointer" }}
        />
      </CSSTransition>
      {/* Navbar */}
      <LeftNavbarSlot isNavbarOpen={isNavOpen}>
        <SuspenseLoader
          children={
            <Navbar handleClose={handleCloseNavbar} isNavbarOpen={isNavOpen} />
          }
        />
      </LeftNavbarSlot>

      {/* main layout */}
      <StyledLayout data-small-screen={isSmallScreen}>
        {/* Header */}
        <HeaderSlot isSmallScreen={isSmallScreen} scrollY={scrollY}>
          <SuspenseLoader
            children={
              <Header
                handleToggle={handleToggle}
                isLargeScreen={isLargeScreen}
              />
            }
          />
        </HeaderSlot>

        <ContentSlot>
          {/* Main Content */}
          <MainSlot isLargeScreen={isLargeScreen}>
            <Outlet />
          </MainSlot>

          {/* Right Sidebar  */}
          {!isSmallScreen && (
            <RightSidebarSlot>
              <SuspenseLoader children={<Sidebar />} />
            </RightSidebarSlot>
          )}
        </ContentSlot>

        {/* Footer */}
        <FooterSlot>
          <SuspenseLoader children={<Footer />} />
        </FooterSlot>
      </StyledLayout>

      <ScrollTopBtn />
    </StyledLayoutWrapper>
  );
};

export default Layout;

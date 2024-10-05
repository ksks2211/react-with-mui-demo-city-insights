import ScrollTopBtn from "components/containers/ScrollTopBtn";
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  useBreakpoints,
  useLockBodyScroll,
  useNavOpen,
  useOverlay,
  useScrollY,
} from "../../hooks";
import Footer from "./Footer";
import Overlay from "./Overlay";
import {
  FooterSlot,
  HeaderSlot,
  LeftNavbarSlot,
  MainSlot,
  RightSidebarSlot,
} from "./slots";
import { ContentSlot, StyledLayout, StyledLayoutWrapper } from "./styled";
import { LayoutProps } from "./types";
// 300 means .3s
export const TRANSITION_DURATION = 300;

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
        <Overlay
          onClick={handleCloseNavbar}
          overlayRef={overlayRef}
          sx={{ cursor: "pointer" }}
        />
      </CSSTransition>
      {/* Navbar */}
      <LeftNavbarSlot isNavbarOpen={isNavOpen}>
        <Navbar handleClose={handleCloseNavbar} isNavbarOpen={isNavOpen} />
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
        <FooterSlot>
          <Footer />
        </FooterSlot>
      </StyledLayout>

      <ScrollTopBtn />
    </StyledLayoutWrapper>
  );
};

export default Layout;

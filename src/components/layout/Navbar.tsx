import { Box, styled } from "@mui/material";
import { common } from "@mui/material/colors";
import cn from "classnames";
import FoldableList from "components/containers/FoldableList";
import { getMenuData, MENU_DATA } from "components/tmp/data";
import { rgba } from "polished";
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";

interface NavbarProps {
  handleClose: () => void;
  isNavbarOpen: boolean;
}

const StyledNavbar = styled(Box)`
  height: 100%;
  width: var(--sidebar-width);

  background-color: var(--navbar-background);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
  &.navbar-open {
    overflow-y: auto;
  }

  .navbar-upper-area {
    position: sticky;
    top: 0;
    height: var(--header-height);

    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: end;
    z-index: 20;

    .navbar-close-btn {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      width: var(--header-height);
      cursor: pointer;

      svg {
        border-radius: 50%;
        display: block;
        backdrop-filter: blur(2px);
        background-color: ${rgba(common.black, 0.04)};
        width: var(--icon-btn-size);
        height: var(--icon-btn-size);
        padding: var(--icon-btn-padding);
      }
    }
  }

  .navbar-main-area {
    margin-bottom: calc(var(--header-height) * 2);
  }
`;

export type FOLDABLE_TYPE = (typeof MENU_DATA)[number];

export default function Navbar({ handleClose, isNavbarOpen }: NavbarProps) {
  const navbarData = getMenuData();

  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const navbarElement = navbarRef.current;
    if (navbarElement && isNavbarOpen) {
      navbarElement.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [isNavbarOpen]);

  return (
    <StyledNavbar
      ref={navbarRef}
      className={cn({ "navbar-open": isNavbarOpen })}
    >
      <div
        className="navbar-upper-area"
        children={
          <button
            className="navbar-close-btn icon-btn"
            children={<CgClose onClick={handleClose} />}
          />
        }
      />

      <div className="navbar-main-area">
        {navbarData.map((region, idx) => (
          <FoldableList
            key={idx}
            data={region}
            handleNavClose={handleClose}
            initialIsOpen={idx === 0}
          />
        ))}
      </div>
    </StyledNavbar>
  );
}

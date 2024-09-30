import { Box, styled } from "@mui/material";
import { common } from "@mui/material/colors";
import FoldableList from "components/containers/FoldableList";
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

const NAVBAR_DATA = [
  {
    title: "asia",
    link: "/asia",
    items: [
      { title: "seoul", link: "/cities/seoul" },
      { title: "tokyo", link: "/cities/tokyo" },
    ],
  },
  {
    title: "europe",
    link: "/europe",
    items: [
      { title: "london", link: "/cities/london" },
      { title: "paris", link: "/cities/paris" },
    ],
  },

  {
    title: "north-america",
    link: "/north-america",
    items: [
      { title: "toronto", link: "/cities/toronto" },
      { title: "new-york", link: "/cities/new-york" },
    ],
  },
];

export type FOLDABLE_TYPE = (typeof NAVBAR_DATA)[number];

export default function Navbar({ handleClose, isNavbarOpen }: NavbarProps) {
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
    <StyledNavbar ref={navbarRef}>
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
        {NAVBAR_DATA.map((region, idx) => (
          <FoldableList key={idx} data={region} handleNavClose={handleClose} />
        ))}
      </div>
    </StyledNavbar>
  );
}

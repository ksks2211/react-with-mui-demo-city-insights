import cn from "classnames";
import FoldableList from "components/containers/FoldableList";
import { getMenuData, MENU_DATA } from "components/tmp/data";
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { useSearchParams } from "react-router-dom";
import { StyledNavbar } from "./styled";
import { NavbarProps } from "./types";

export type FOLDABLE_TYPE = (typeof MENU_DATA)[number];

const useSelectedContinent = () => {
  const [searchParams] = useSearchParams();

  const continent = searchParams.get("continent");

  return continent !== null ? continent : undefined;
};

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

  const selectedContinent = useSelectedContinent();

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
            initialIsOpen={
              selectedContinent ? selectedContinent === region.title : idx === 0
            }
            selectedCategory={selectedContinent}
          />
        ))}
      </div>
    </StyledNavbar>
  );
}

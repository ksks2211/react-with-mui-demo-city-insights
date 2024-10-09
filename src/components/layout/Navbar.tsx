import cn from "classnames";
import FoldableList from "components/containers/FoldableList";
import { useSelectedCity, useSelectedRegion } from "hooks";
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { getMenuData } from "shared/constants";
import { StyledNavbar } from "./styled";
import { NavbarProps } from "./types";

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

  const regionBySearchParams = useSelectedRegion();
  const { city, region: regionByPathVariable } = useSelectedCity();

  const expectedRegion = regionBySearchParams || regionByPathVariable;

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
              expectedRegion ? expectedRegion === region.title : idx === 0
            }
            selectedCategory={expectedRegion}
            selectedSubCategory={city}
          />
        ))}
      </div>
    </StyledNavbar>
  );
}

import cn from "classnames";
import FoldableList from "components/containers/FoldableList";
import QueryGuard from "components/guards/QueryGuard";
import { useSelectedCityWithRegion, useSelectedRegion } from "hooks";
import { useGetMenu } from "hooks/queries/useMenu";
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { Menu } from "shared/types";
import { StyledNavbar } from "./styled";
import { NavbarProps } from "./types";

export function Navbar({
  handleClose,
  isNavbarOpen,
  data,
}: NavbarProps & { data: Menu }) {
  // const navbarData = getMenuData();
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
  const { city, region: regionByPathVariable } = useSelectedCityWithRegion();

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
        {data.map((region, idx) => (
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

export default function NavbarWithGuard({
  handleClose,
  isNavbarOpen,
}: NavbarProps) {
  const query = useGetMenu();
  return (
    <QueryGuard
      query={query}
      Component={Navbar}
      handleClose={handleClose}
      isNavbarOpen={isNavbarOpen}
    />
  );
}

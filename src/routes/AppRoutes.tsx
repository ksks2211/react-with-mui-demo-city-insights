import SuspenseLoader from "components/containers/SuspenseLoader";
import LoadingBox from "components/presentational/LoadingBox";
import Demographics from "pages/Demographics";
import { lazy, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const Layout = lazy(() => import("../components/layout/Layout.tsx"));
const MainPage = lazy(() => import("../pages/MainPage/MainPage.tsx"));
const CityDetailsPage = lazy(
  () => import("../pages/CityDetailsPage/CityDetailsPage.tsx")
);

const NotFoundPage = lazy(() => import("../pages/NotFoundPage.tsx"));

const useScrollReset = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable the browser's default scroll restoration on back/forward navigation
    window.history.scrollRestoration = "manual";

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    // Re-enable scroll restoration when the component is unmounted
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, [pathname]);
};

const AppRoutes = () => {
  useScrollReset();

  return (
    <Routes>
      {/* pages with layout */}
      <Route path="/" element={<SuspenseLoader children={<Layout />} />}>
        <Route index element={<SuspenseLoader children={<MainPage />} />} />
        <Route
          path="/:city"
          element={<SuspenseLoader children={<CityDetailsPage />} />}
        />

        <Route
          path="example"
          element={
            <div>
              <Link to="/demographics">demographics</Link>
              <LoadingBox />
            </div>
          }
        />
        <Route path="demographics" element={<Demographics />} />
      </Route>

      <Route
        path="*"
        element={<SuspenseLoader children={<NotFoundPage />} />}
      />
    </Routes>
  );
};

export default AppRoutes;

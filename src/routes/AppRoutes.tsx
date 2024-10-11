import RippleBox from "components/containers/RippleBox";
import SuspenseLoader from "components/containers/SuspenseLoader";
import LoadingBox from "components/presentational/LoadingBox";
import Demographics from "pages/Demographics";
import { lazy, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { NotFoundPage } from "../pages";

const Layout = lazy(() => import("../components/layout/Layout.tsx"));
const MainPage = lazy(() => import("../pages/MainPage/MainPage.tsx"));
const CityDetailsPage = lazy(
  () => import("../pages/CityDetailsPage/CityDetailsPage.tsx")
);

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

              <RippleBox backgroundColor="orange">
                Aute deserunt exercitation nulla incididunt in occaecat deserunt
                anim laboris sit reprehenderit. Culpa est nostrud laborum amet
                consectetur laborum voluptate ipsum dolore nisi velit veniam.
                Non velit ad proident anim irure reprehenderit est. Exercitation
                Lorem culpa cillum quis commodo cillum do nulla proident in
                mollit. Aute non laboris esse fugiat excepteur reprehenderit
                labore elit. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Quia quibusdam saepe obcaecati ad cupiditate aut possimus
                voluptas eos ab ratione, explicabo unde id fugiat sapiente,
                voluptates nulla neque sint omnis Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Similique, autem quibusdam!
                Adipisci eius quo amet illo cupiditate optio nihil deleniti iste
                modi, tempore, dolorem molestiae quibusdam quos velit
                consequuntur id. Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Accusamus eveniet temporibus rerum qui, porro
                necessitatibus velit delectus, id, sed ullam illo hic excepturi
                explicabo alias et cupiditate deserunt libero maiores!
              </RippleBox>
              <LoadingBox />
            </div>
          }
        />
        <Route path="demographics" element={<Demographics />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

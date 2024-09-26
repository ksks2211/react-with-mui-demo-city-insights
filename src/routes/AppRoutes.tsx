import Demographics from "pages/Demographics";
import { Link, Route, Routes } from "react-router-dom";
import { Header, Layout, Navbar } from "../components/layout";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* pages with layout */}
      <Route path="/" element={<Layout Header={Header} Navbar={Navbar} />}>
        <Route
          index
          element={
            <div>
              <Link to="/demographics">demographics</Link>
              <p>
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
              </p>
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

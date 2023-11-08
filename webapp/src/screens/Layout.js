import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  return (
    <>
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <Link to="/">Home</Link>&nbsp;
            <Link to="/knowlage">Baza wiedzy</Link>&nbsp;
            <Link to="/settings">Ustawienia</Link>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
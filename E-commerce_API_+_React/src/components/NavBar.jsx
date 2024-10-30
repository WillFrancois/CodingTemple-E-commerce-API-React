import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            listStyle: "none",
          }}
        >
          <li>
            <NavLink to="/customer">Customer Page</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product Page</NavLink>
          </li>
          <li>
            <NavLink to="/order">Order Page</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;

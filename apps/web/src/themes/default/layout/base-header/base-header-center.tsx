import {NavbarList} from "./navbar-list";

export const BaseHeaderCenter = ({ navbarList }) => (
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal p-0">
      <NavbarList navbarList={navbarList} />
    </ul>
  </div>
)

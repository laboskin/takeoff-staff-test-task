import React, { useRef } from "react";
import "./Header.css";
import { useContacts } from "../../hoc/Contacts/Contacts";
import { useAuth } from "../../hoc/Auth/Auth";

function Header() {
  const { search, setSearch } = useContacts();
  const { logoutHandler } = useAuth();
  const logoutButtonRef = useRef(null);

  return (
    <header className="navbar-fixed">
      <nav className="nav-wrapper">
        <div className="input-field">
          <input
            id="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() =>
              logoutButtonRef.current.classList.add("logout-search-active")
            }
            onBlur={() =>
              logoutButtonRef.current.classList.remove("logout-search-active")
            }
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
        </div>
        <ul>
          <li>
            <a ref={logoutButtonRef} href="/" onClick={() => logoutHandler()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

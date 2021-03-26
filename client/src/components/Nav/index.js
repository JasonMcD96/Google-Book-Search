import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <a href="/search" className="navbar-brand">
        Search
      </a>
      <a href="/saved" className="navbar-brand">
        Saved
        </a>
    </nav>
  );
}

export default Nav;

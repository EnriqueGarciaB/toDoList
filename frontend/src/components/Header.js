// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import "../styles/header.css";

const Header = ({ isAuthenticated }) => {
  return (
    <header className="headerTodoApp">
      <h1 className="titleTodoApp">Todo List App</h1>
      <nav>
        {!isAuthenticated ? (
          <div className="nav-links">
            <Link to="/login" className="linkTodoApp">
              Login
            </Link>
            <Link to="/register" className="linkTodoApp">
              Register
            </Link>
          </div>
        ) : (
          <LogoutButton />
        )}
      </nav>
    </header>
  );
};

export default Header;

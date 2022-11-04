import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  test() {
    const pathname = window.location.pathname;

    if (pathname !== "/login" || pathname !== "/register" || pathname !== "/") {
      return (
        <Link
        to="/dashboard"
        style={{
          fontFamily: "monospace"
        }}
        className="col s5 brand-logo left black-text"
      >
        Back
      </Link>
      );
    }
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">local_fire_department</i>
              Portal
            </Link>
              {this.test()}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
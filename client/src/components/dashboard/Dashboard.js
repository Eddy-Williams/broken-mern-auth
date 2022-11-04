import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { Dropdown } from './dropdown.js'
import { Element } from './elements.js';
import Navbar from "../layout/Navbar";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div><Navbar />
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Welcome,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You have been successfully logged in to the{" "}
                <span style={{ fontFamily: "monospace" }}>Portal</span>
              </p>
            </h4>
            <div>
            <>
              <Dropdown />
              <Element />
              </>
            </div>
            <div>
              <Link
                to="/tron"
                style={{
                  fontFamily: "monospace"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Tron
              </Link>
            </div>
            <div>
              <Link
                to="/compvision"
                style={{
                  fontFamily: "monospace"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Computer Vision
              </Link>
            </div>
            <button
              style={{
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3">
              Logout
            </button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

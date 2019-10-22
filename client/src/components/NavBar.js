import React, { Component, Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class SiteNavbar extends Component {
  render() {
    return (
      <Fragment>
        <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
          <Link to="/" className="sidebar-title">Shopping Kumpel</Link>
            <Nav className="ml-auto">
              <Fragment>
                  <Link to="/login" className="sidebar-link">LogIn</Link>
                  <Link to="/signup" className="sidebar-link">SignUp</Link>
                </Fragment>
              }
            </Nav>
        </Navbar>
      </Fragment>
    )
  }
}

export default SiteNavbar;
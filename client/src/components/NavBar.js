import React, { Fragment } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SiteNavbar = ({ isLoggedIn, checkLoggedIn }) => {

  const logOut = () => {
    axios.post("/users/signout")
    .then(res => {
      if (res.data === 'ok') {
        checkLoggedIn();
      }
    }).catch(res => console.log(res))
  }

  return (
    <Fragment>
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Link to="/" className="sidebar-title">Shopping Kumpel</Link>
          <Nav className="ml-auto">
            {!isLoggedIn ? 
            <Fragment>
              <Link to="/login" className="sidebar-link">LogIn</Link>
              <Link to="/signup" className="sidebar-link">SignUp</Link>
            </Fragment>
            :
            <Fragment>
              <Link to="/list" className="sidebar-link">My List</Link>
              <Button onClick={() => logOut()} className="sidebar-link">SignOut</Button>
            </Fragment>
            }
          </Nav>
      </Navbar>
    </Fragment>
  )
}

export default SiteNavbar;
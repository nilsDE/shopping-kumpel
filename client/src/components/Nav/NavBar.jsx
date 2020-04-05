import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faList, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import './NavBar.css';

const SiteNavbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
                <Link to="/" className="sidebar-title">
                    Shopping Kumpel
                </Link>
                <Nav className="ml-auto">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="sidebar-link">
                                <FontAwesomeIcon icon={faSignInAlt} /> SignIn
                            </Link>
                            <Link to="/signup" className="sidebar-link">
                                <FontAwesomeIcon icon={faHandPointRight} /> SignUp
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/overview" className="sidebar-link">
                                <FontAwesomeIcon icon={faList} /> My Lists
                            </Link>
                            <Button onClick={() => logout()} className="sidebar-link">
                                <FontAwesomeIcon icon={faSignOutAlt} /> SignOut
                            </Button>
                        </>
                    )}
                </Nav>
            </Navbar>
        </>
    );
};

export default SiteNavbar;

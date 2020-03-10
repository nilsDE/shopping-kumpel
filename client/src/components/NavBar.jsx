import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

const SiteNavbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout } = authContext;

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
                                LogIn
                            </Link>
                            <Link to="/signup" className="sidebar-link">
                                SignUp
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/list" className="sidebar-link">
                                My List
                            </Link>
                            <Button
                                onClick={() => logout()}
                                className="sidebar-link"
                            >
                                SignOut
                            </Button>
                        </>
                    )}
                </Nav>
            </Navbar>
        </>
    );
};

export default SiteNavbar;

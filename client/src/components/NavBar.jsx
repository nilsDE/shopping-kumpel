import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const SiteNavbar = () => {
    const userContext = useContext(UserContext);
    const { logOut } = userContext;

    return (
        <>
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
                <Link to="/" className="sidebar-title">
                    Shopping Kumpel
                </Link>
                <Nav className="ml-auto">
                    {/* {!loggedIn ? (
                        <>
                            <Link to="/login" className="sidebar-link">
                                LogIn
                            </Link>
                            <Link to="/signup" className="sidebar-link">
                                SignUp
                            </Link>
                        </>
                    ) : ( */}
                    <>
                        <Link to="/list" className="sidebar-link">
                            My List
                        </Link>
                        <Button
                            onClick={() => logOut()}
                            className="sidebar-link"
                        >
                            SignOut
                        </Button>
                    </>
                    {/* )} */}
                </Nav>
            </Navbar>
        </>
    );
};

export default SiteNavbar;

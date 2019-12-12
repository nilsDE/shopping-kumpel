import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const SiteNavbar = ({ isLoggedIn, checkLoggedIn }) => {
    const logOut = () => {
        axios
            .post('/users/signout')
            .then(res => {
                if (res.data === 'ok') {
                    checkLoggedIn();
                }
            })
            .catch(res => console.log(res));
    };

    return (
        <>
            <Navbar fixed='top' bg='dark' variant='dark' expand='lg'>
                <Link to='/' className='sidebar-title'>
                    Shopping Kumpel
                </Link>
                <Nav className='ml-auto'>
                    {!isLoggedIn ? (
                        <>
                            <Link to='/login' className='sidebar-link'>
                                LogIn
                            </Link>
                            <Link to='/signup' className='sidebar-link'>
                                SignUp
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/list' className='sidebar-link'>
                                My List
                            </Link>
                            <Button
                                onClick={() => logOut()}
                                className='sidebar-link'
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

SiteNavbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    checkLoggedIn: PropTypes.func.isRequired
};

export default SiteNavbar;

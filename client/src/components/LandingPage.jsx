import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import bg from '../assets/unsplash1.jpg';
import '../App.css';

const LandingPage = ({ isLoggedIn }) => {
    return (
        <>
            <div className='bg-container'>
                <h2 className='bg-headline-1'>Welcome to</h2>
                <h2 className='bg-headline-2'>Shopping Kumpel</h2>
                <img src={bg} className='bg-pic' alt='' />
            </div>
            <div className='btn-container'>
                {!isLoggedIn ? (
                    <Link to='/signup'>
                        <Button
                            variant='outline-dark'
                            className='signup-btn mt-4'
                            size='lg'
                        >
                            Sign Up!
                        </Button>
                    </Link>
                ) : (
                    <p>Logged in successfully!</p>
                )}
            </div>
        </>
    );
};

LandingPage.propTypes = {
    isLoggedIn: PropTypes.bool
};

LandingPage.defaultProps = {
    isLoggedIn: false
};

export default LandingPage;

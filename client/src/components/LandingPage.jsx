import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import bg from '../assets/unsplash1.jpg';
import UserContext from '../context/user/userContext';
import '../App.css';

const LandingPage = () => {
    const userContext = useContext(UserContext);
    return (
        <>
            <div className="bg-container">
                <h2 className="bg-headline-1">Welcome to</h2>
                <h2 className="bg-headline-2">Shopping Kumpel</h2>
                <img src={bg} className="bg-pic" alt="" />
            </div>
            <div className="btn-container">
                {/* {!loggedIn ? (
                    <Link to="/signup">
                        <Button
                            variant="outline-dark"
                            className="signup-btn mt-4"
                            size="lg"
                        >
                            Sign Up!
                        </Button>
                    </Link>
                ) : (
                    <p>Logged in successfully!</p>
                )} */}
            </div>
        </>
    );
};

export default LandingPage;

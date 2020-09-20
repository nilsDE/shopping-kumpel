import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import Logo from './Utils/Logo';

import '../App.css';
import './LandingPage.css';

const LandingPage = () => {
    const authContext = useContext(AuthContext);
    return (
        <div className="landing-page">
            <Logo />
            <div className="btn-container">
                {!authContext.isAuthenticated ? (
                    <Link to="/signup">
                        <button type="button" className="btn-default btn-outline mt-4" size="lg">
                            Sign Up!
                        </button>
                    </Link>
                ) : (
                    <p>You are logged in!</p>
                )}
            </div>
        </div>
    );
};

export default LandingPage;

import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/NavBar';
import ShoppingList from './components/ShoppingList';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

import './App.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const isLoggedIn = () => {
        axios
            .get('/users/verify')
            .then(res => {
                setLoggedIn(res.data.msg);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        isLoggedIn();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='App'>
            <NavBar isLoggedIn={loggedIn} checkLoggedIn={() => isLoggedIn()} />
            <div className='main-content'>
                <Route
                    exact
                    path='/'
                    render={() => <LandingPage isLoggedIn={loggedIn} />}
                />
                <Route
                    path='/signup'
                    render={() => (
                        <SignUpForm
                            isLoggedIn={loggedIn}
                            checkLoggedIn={() => isLoggedIn()}
                        />
                    )}
                />
                <Route
                    path='/login'
                    render={() => (
                        <LoginForm
                            isLoggedIn={loggedIn}
                            checkLoggedIn={() => isLoggedIn()}
                        />
                    )}
                />
                <Route
                    path='/list'
                    render={() => <ShoppingList isLoggedIn={loggedIn} />}
                />
            </div>
        </div>
    );
};

export default App;

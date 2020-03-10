import React from 'react';
import { Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import NavBar from './components/NavBar';
import ShoppingList from './components/ShoppingList';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ListState from './context/list/ListState';
import AuthState from './context/auth/AuthState';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <ListState>
                <div className="App">
                    <NavBar />
                    <div className="main-content">
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/signup" component={SignUpForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/list" component={ShoppingList} />
                    </div>
                </div>
            </ListState>
        </AuthState>
    );
};

export default App;

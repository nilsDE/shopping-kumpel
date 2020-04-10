import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/Routing/PrivateRoute';
import NavBar from './components/Nav/NavBar';
import ShoppingList from './components/List/ShoppingList';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/Auth/SignUpForm';
import LoginForm from './components/Auth/LoginForm';
import Overview from './components/Overview/Overview';
import ListState from './context/list/ListState';
import AuthState from './context/auth/AuthState';

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
                        <PrivateRoute path="/list/:id" component={ShoppingList} />
                        <PrivateRoute path="/overview" component={Overview} />
                    </div>
                </div>
            </ListState>
        </AuthState>
    );
};

export default App;

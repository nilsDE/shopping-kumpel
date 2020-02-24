import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ShoppingList from './components/ShoppingList';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import UserState from './context/user/UserState';
import ListContext from './context/list/listContext';

import './App.css';

const App = () => {
    const listContext = useContext(ListContext);
    console.log(listContext);
    return (
        <UserState>
            <div className="App">
                <NavBar />
                <div className="main-content">
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/signup" component={SignUpForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/list" component={ShoppingList} />
                </div>
            </div>
        </UserState>
    );
};

export default App;

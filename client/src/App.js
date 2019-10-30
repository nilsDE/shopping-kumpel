import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ShoppingList from './components/ShoppingList';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import axios from 'axios';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    axios.get('/users/verify')
    .then(res => {
      this.setState({ isLoggedIn: res.data.msg });
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar isLoggedIn={this.state.isLoggedIn} checkLoggedIn={() => this.isLoggedIn()} />
        <div className="main-content">
          <Route exact path="/" render={ () => <LandingPage isLoggedIn={this.state.isLoggedIn} /> } />
          <Route path="/signup" render={ () => <SignUpForm isLoggedIn={this.state.isLoggedIn} checkLoggedIn={() => this.isLoggedIn()} /> } />
          <Route path="/login" render={ () => <LoginForm isLoggedIn={this.state.isLoggedIn} checkLoggedIn={() => this.isLoggedIn()} /> } />
          <Route path="/list" render={ () => <ShoppingList isLoggedIn={this.state.isLoggedIn} /> } />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import bg from './../assets/unsplash1.jpg';
import { Button } from 'react-bootstrap';
import './../App.css';

export class LandingPage extends Component {

  render() {
    return (
      <Fragment>
        <div className="bg-container">
          <h2 className="bg-headline-1">Welcome to</h2>
          <h2 className="bg-headline-2">Shopping Kumpel</h2>
          <img src={ bg } className="bg-pic" alt=""/>
        </div>
        <div className="btn-container">
          {!this.props.isLoggedIn ?
          <Link to="/signup">
            <Button
            variant="outline-dark"
            className="signup-btn mt-4"
            size="lg"
            >Sign Up!</Button>
          </Link>
          :
          <p>Logged in successfully!</p>
          }
        </div>
      </Fragment>
    )
  }
}

export default LandingPage;

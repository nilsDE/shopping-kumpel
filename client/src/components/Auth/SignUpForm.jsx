import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import Alert from '../Utils/Alert';

import './Form.css';

const SignUpForm = props => {
    const authContext = useContext(AuthContext);
    const { register, msg, isAuthenticated } = authContext;

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/list');
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history]);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: form.name,
            email: form.email,
            password: form.password
        };
        register(data);
    };

    const handleChange = e =>
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    return (
        <>
            <Alert type="danger" msg={msg} />
            <div className="form-container">
                <Form className="signup-login-form" onSubmit={e => handleSubmit(e)}>
                    <h2>Sign up</h2>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={e => handleChange(e)}
                            maxLength="20"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            name="email"
                            type="text"
                            placeholder="Enter email"
                            onChange={e => handleChange(e)}
                            maxLength="255"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={e => handleChange(e)}
                            maxLength="255"
                        />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">
                        Submit
                    </Button>
                </Form>
                <div className="arrow-area" />
            </div>
        </>
    );
};

export default SignUpForm;

SignUpForm.propTypes = {
    history: PropTypes.object.isRequired
};

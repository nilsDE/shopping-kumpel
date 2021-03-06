import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Alert from '../Utils/Alert';
import AuthContext from '../../context/auth/authContext';

import './Form.css';

const LoginForm = props => {
    const authContext = useContext(AuthContext);
    const { login, isAuthenticated, msg } = authContext;

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/overview');
        }
    }, [isAuthenticated, props.history]);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: form.email,
            password: form.password
        };
        login(data);
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
                    <h2>Sign in</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            name="email"
                            type="email"
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
                    <button className="btn-default btn-solid" type="submit">
                        Submit
                    </button>
                </Form>
                <div className="arrow-area" />
            </div>
        </>
    );
};

export default LoginForm;

LoginForm.propTypes = {
    history: PropTypes.object.isRequired
};

import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthContext from '../context/auth/authContext';

const LoginForm = props => {
    const authContext = useContext(AuthContext);
    const { login, isAuthenticated } = authContext;

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        // TODO: get the error from authContext and handle it
        if (isAuthenticated) {
            props.history.push('/list');
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
            <Form
                className="mt-5 signup-login-form"
                onSubmit={e => handleSubmit(e)}
            >
                <h2>Login</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={e => handleChange(e)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={e => handleChange(e)}
                    />
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;

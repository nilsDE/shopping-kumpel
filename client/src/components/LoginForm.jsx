import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
import UserContext from '../context/user/userContext';

const LoginForm = () => {
    const userContext = useContext(UserContext);
    const { checkLoggedIn } = userContext;

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('/users/signin', {
                email: form.email,
                password: form.password
            })
            .then(res => {
                if (res.data === 'ok') {
                    checkLoggedIn();
                    setRedirect(true);
                }
            })
            .catch(res => console.log(res));
    };

    const handleChange = e =>
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    if (redirect) {
        return <Redirect to="/list" />;
    }

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

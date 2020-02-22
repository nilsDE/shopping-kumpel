import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import UserContext from '../context/user/userContext';

const SignUpForm = () => {
    const userContext = useContext(UserContext);
    const { signUp, redirect } = userContext;

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        redirect: false
    });

    const handleSubmit = e => {
        e.preventDefault();
        signUp(form.name, form.email, form.password);
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
                <h2>SignUp</h2>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={e => handleChange(e)}
                    />
                </Form.Group>
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

export default SignUpForm;

import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthContext from '../context/auth/authContext';

const SignUpForm = props => {
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/list');
        }
        // do something with the error
        console.log(error);
        clearErrors();
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

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

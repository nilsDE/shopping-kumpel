import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

const SignUpForm = ({ checkLoggedIn }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        redirect: false
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('/users', {
                name: form.name,
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
        return <Redirect to='/list' />;
    }

    return (
        <>
            <Form
                className='mt-5 signup-login-form'
                onSubmit={e => handleSubmit(e)}
            >
                <h2>SignUp</h2>
                <Form.Group controlId='formBasicName'>
                    <Form.Control
                        name='name'
                        type='text'
                        placeholder='Name'
                        onChange={e => handleChange(e)}
                    />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Control
                        name='email'
                        type='email'
                        placeholder='Enter email'
                        onChange={e => handleChange(e)}
                    />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Control
                        name='password'
                        type='password'
                        placeholder='Password'
                        onChange={e => handleChange(e)}
                    />
                </Form.Group>
                <Button variant='outline-dark' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

SignUpForm.propTypes = {
    checkLoggedIn: PropTypes.func.isRequired
};

export default SignUpForm;

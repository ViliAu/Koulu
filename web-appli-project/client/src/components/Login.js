import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Helmet from 'react-helmet';
import CenterItem from './CenterItem';
import InputGroup from 'react-bootstrap/InputGroup'

const Login = () => {
    const [validated, setValidated] = useState(false);

    let pswdVisible = false;

    const handleSubmit = async (event) => {
        event.preventDefault();
        // First, check validity locally, then post data and check validity on backend
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        // Create user obj to pass to the server
        let user = {};
        user.name = document.getElementById('formUsername').value;
        user.password = document.getElementById('formPassword').value;

        // Pass values to server
        let data = {};
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(user)
            })
            data = await res.json();
            console.log(data);
        }
        catch { }

        // Form was valid but credentials incorrect
        // TODO: Nicer looking message
        if (!data.success) {
            if (data.error) {
                alert(data.error);
            }
            event.stopPropagation();
            setValidated(true);
            return;
        }

        // Save token to localstorage
        else {
            localStorage.setItem('auth_token', data.token);
            // Use vanilla redirect to update navbar
            window.location.href = `/users/${user.name}`;
        }
    }

    const changePasswordVisibility = () => {
        pswdVisible = !pswdVisible;
        document.getElementById('formPassword').type = pswdVisible ? 'text' : 'password';
        const pswdBtn = document.getElementById('pswdButton');
        pswdBtn.querySelector('img').src = pswdVisible ? '/eye.png' : '/eye_closed.png';
    }


    return (
        <>
            <Helmet>
                <title>Log in</title>
            </Helmet>
            <Container className='text-center'>
                <img
                    alt=''
                    src='logo192.png'
                    className='center'
                />
                <h1 className='display-3'>Log in</h1>
            </Container>

            <CenterItem md={5}>
                <Form noValidate validated={validated} className='loginForm' onSubmit={handleSubmit} autoComplete='off'>
                    <Form.Group className='mb-3' controlId='formUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' required pattern={'^[a-zA-Z\\d]{3,15}$'} />
                        <Form.Control.Feedback id='usernameFeedback' type="invalid">Please enter a valid username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <InputGroup className='mb-3'>
                            <Form.Control type='password' required pattern={'[a-zA-Z\\d!@#$%^&?]{1,20}$'} />
                            <Button variant='outline-secondary' id='pswdButton' onClick={changePasswordVisibility}><img alt='' src='/eye_closed.png' width={25} height={25} /></Button>
                        </InputGroup>
                        <Form.Control.Feedback id='usernameFeedback' type='invalid'>Please enter a password.</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                    <Form.Text className='text-muted display-3' style={{ marginLeft: '10px' }}>
                        Don't have an account? <Link to='/register'>Register now!</Link>
                    </Form.Text>
                </Form>
            </CenterItem>
        </>
    );
}

export default Login

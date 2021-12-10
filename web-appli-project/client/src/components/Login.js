import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Helmet from 'react-helmet';
import CenterItem from './CenterItem';
import '../styles/LoginStyle.css';

const Login = () => {
    return (
        <>
            <Helmet>
                <title>Log in</title>
            </Helmet>
            <CenterItem>
                <img
                    alt=''
                    src='logo192.png'
                    className='center'
                />
                <h1 className='display-3'>Log in</h1>
            </CenterItem>
            <CenterItem>
                <Form className='registerForm'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Form.Text className='text-muted display-3' style={{marginLeft: '10px'}}>
                        Don't have an account? <a href='/register'>Register now!</a>
                    </Form.Text>
                </Form>
            </CenterItem>
        </>
    );
}

export default Login

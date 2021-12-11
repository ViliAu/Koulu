import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CenterItem from './CenterItem';
import Helmet from 'react-helmet';
//import '../styles/RegisterStyle.css';

const Register = () => {
    return (
        <>
            <Helmet>
                <title>Register user</title>
            </Helmet>
            <Container className='text-center'>
                <img
                    alt=''
                    src='logo192.png'
                />
                <h1 className='display-3 text-center'>Register</h1>
            </Container>

            <CenterItem>
                <Form className='registerForm'>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        <Form.Text className="text-muted">
                            Password must be between 8-20 characters and contain a capital letter and a number.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </CenterItem>
        </>
    );
}

export default Register;

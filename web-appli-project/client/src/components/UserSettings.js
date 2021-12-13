import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UserSettings = () => {
    const [user, setUser] = useState(null);

    // Get user from authentication api so that the view is not visible to non-auth people
    useEffect(() => {
        let mounted = true;
        // Get user data from backend API
        async function fetchUserData() {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setUser(null);
                return;
            }
            try {
                const req = await fetch('/api/user/authenticate', {
                    method: 'GET',
                    headers: { 'authorization': 'Bearer ' + token }
                });
                if (mounted) {
                    // Unauthorized (token may be expired)
                    if (req.status === 401) {
                        setUser(null);
                        localStorage.removeItem('auth_token');
                    }
                    // Authorized
                    else {
                        const userData = await req.json();
                        setUser(userData);
                    }
                }
            }
            catch { }
        }
        fetchUserData();
        return () => {
            mounted = false;
        }
    }, []);

    const {id} = useParams();

    return (
        <>
            <Container text='light' style={{ padding: 20, marginTop: 20, backgroundColor: '#1A1C1E', borderRadius: 8 }} >
                <h1>Edit profile</h1>
                <Form className='postForm'>
                    <Form.Group className="mb-3" controlId="postForm.header">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postForm.text">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter a quick summary about yourself" rows={8} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postForm.code">
                    </Form.Group>
                    <Button variant="primary">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default UserSettings

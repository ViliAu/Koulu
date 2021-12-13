import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserPreview from './UserPreview';

// This is the user view
const User = () => {
    const [user, setUser] = useState(null);
    const { userName } = useParams();
    // Get user on load
    useEffect(() => {
        let mounted = true;
        // Get user data from backend API
        async function fetchUserData() {
            try {
                const req = await fetch(`/api/user/getuser?name=${userName}`);
                const userData = await req.json();
                if (mounted) {
                    setUser(userData);
                }
            }
            catch { }
        }
        if (userName);
        fetchUserData();
        return () => {
            mounted = false;
        }
    }, [userName]);

    return (
        <Container>
            <Row>
                <Col>
                    <UserPreview />
                </Col>
                <Col>
                    <UserPreview />
                </Col>
                <Col>
                    <UserPreview />
                </Col>
            </Row>

        </Container>
    )
}

export default User

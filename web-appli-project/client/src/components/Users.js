import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UserPreview from './UserPreview';
import UserPage from './UserPage';

// This is the user view
const User = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    // Get user on load
    useEffect(() => {
        let mounted = true;
        // Get user data from backend API
        async function fetchUserData() {
            try {
                const req = await fetch(`/api/user/getuser?name=${id}`);
                const data = await req.json();
                if (mounted) {
                    if (data.success) {
                        setUser(data.user);
                    }
                }
            }
            catch { }
        }
        if (id) {
            fetchUserData();
        }
        return () => {
            mounted = false;
        }
    }, []);

    if (id) {
        return <UserPage user={user} />
    }
    else {
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
}
export default User

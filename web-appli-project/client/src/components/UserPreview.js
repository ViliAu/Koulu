import React from 'react';
import {Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import UserImage from './UserImage';

const UserPreview = ({ user }) => {

    return (
        <Link to={user.name} style={{ textDecoration: 'none' }}>
            <Container id='postBody' text='light' style={{ padding: 20, marginTop: 20, backgroundColor: '#1A1C1E', borderRadius: 8 }} >
                <Row>
                    <Col xs={'auto'}>
                        <UserImage id={user} />
                    </Col>
                    <Col>
                        <Stack gap={2}>
                            <h5>{user.name}</h5>
                            <p>{user.bio}</p>
                            <small className='text-muted'>{user.registerDate}</small>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </Link>

    )
}

UserPreview.defaultProps = {
    user: {
        name: 'Defaultuser',
        bio: 'Default bio',
        image: 'none',
        registerDate: new Date().toDateString()
    }
}

export default UserPreview;

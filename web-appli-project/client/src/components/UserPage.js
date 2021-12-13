import React from 'react';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { DateTime } from 'luxon';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CenterItem from './CenterItem';
import UserImage from './UserImage';
import NotFound from './NotFound';

const UserPage = ({ user }) => {
    const loggedIn = (localStorage.getItem('auth_token') !== null);
    console.log(user);
    if (user) {
        return (
            <CenterItem>
                <Container id='userBody' text='light' style={{ padding: 20, marginTop: 20, backgroundColor: '#1A1C1E', borderRadius: 8 }} >
                    <Row>
                        <Col xs={'auto'}>
                            <LinkContainer to={'/users'} style={{ marginBottom: 10 }}>
                                <Button>{`← Back`}</Button>
                            </LinkContainer>
                        </Col>
                        <Col></Col>
                        <Col xs={'auto'}>
                            {loggedIn ?
                                <LinkContainer to={'settings'} style={{ marginBottom: 10 }}>
                                    <Button>{`⚙ Edit profile`}</Button>
                                </LinkContainer> : <></>}
                        </Col>
                    </Row>
                    <Container className='text-center' style={{ marginTop: 20 }}>
                        <Container style={{ padding: 20 }}>
                            <UserImage size={128} />
                        </Container>
                        <h1 className='display-3'>{user.name}</h1>
                        <hr/>
                        {(user.bio && user.bio.trim().length === 0) ? <p>{user.bio}</p> : <p className='text-muted'><i>User has no bio</i></p>}
                        <hr/>
                        <small className='text-muted'>Registered on {DateTime.fromISO(user.registerDate).toLocaleString(DateTime.DATETIME_MED)}</small>
                    </Container>
                </Container>
            </CenterItem>
        );
    }
    else {
        return (<NotFound />);
    }

}

export default UserPage;

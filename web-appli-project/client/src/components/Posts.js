import React from 'react';
import LinkContainer from 'react-router-bootstrap/LinkContainer'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack'
import PostPreview from './PostPreview';

const Posts = () => {
    return (
        <Container text='light' style={{padding: 10}}>
            <Row className="d-flex align-items-middle" float="center">
                <Col md={'auto'} xs={6}>
                    <h1>All posts on CODE SITE</h1>
                </Col>
                <Col xs={0}></Col>
                <Col xs={'auto'}  className="text-center">
                    <LinkContainer to='/create'>
                        <Button variant='outline-primary' >+ Create post</Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Row>
                <Stack gap={3}>
                    <PostPreview />
                    <hr/>
                    <PostPreview />
                    <hr/>
                    <PostPreview />
                </Stack>
            </Row>
        </Container>
    )
}

export default Posts

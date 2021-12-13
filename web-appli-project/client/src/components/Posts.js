import React from 'react';
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import {useParams} from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack'
import PostPreview from './PostPreview';

import Post from './Post';

const Posts = () => {
    const {id} = useParams();
    if (id) {
        return (
            <Post id={id} />
        );
    }
    else {
        return (
            <Allposts />
        );
    }
    
}

const Allposts = () => {
    return (
        <Container text='light' style={{ padding: 10 }}>
            <Row className="d-flex align-items-middle" float="center">
                <Col md={'auto'} xs={6}>
                    <h1>All posts on CODE SITE</h1>
                </Col>
                <Col xs={0}></Col>
                <Col xs={'auto'} className="text-center">
                    <LinkContainer to='/create'>
                        <Button variant='outline-primary' >+ Create post</Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Row>
                <Stack gap={3}>

                    <PostPreview />

                    <PostPreview />
                    <hr />
                    <PostPreview />
                </Stack>
            </Row>
        </Container>
    )
}

export default Posts

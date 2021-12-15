import {React, useEffect, useState} from 'react';
import LinkContainer from 'react-router-bootstrap/LinkContainer'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack'
import PostPreview from './PostPreview';

const Posts = () => {
    const [posts, setPosts] = useState(null);
    // Get query string
    const query = window.location.search;

    useEffect(() => {
        let mounted = true;
        // Get user data from backend API
        async function fetchPosts() {
            try {
                const req = await fetch(`/api/post/preview` + query);
                const data = await req.json();
                if (mounted) {
                    if (req.ok) {
                        setPosts(data.previews.map((post) => <PostPreview post={post}/>))
                    }
                }
            }
            catch { }
        }
        fetchPosts();
        return () => {
            mounted = false;
        }
    }, [query]);

    return (
        <Allposts posts={posts} />
    );

}

const Allposts = ({posts}) => {
    
    let isLoggedIn = localStorage.getItem('auth_token') !== null;

    return (
        <Container text='light' style={{ padding: 10 }}>
            <Row className="d-flex align-items-middle" float="center">
                <Col md={'auto'} xs={6}>
                    <h1>All posts on CODE SITE</h1>
                </Col>
                <Col xs={0}></Col>
                <Col xs={'auto'} className="text-center">
                    {isLoggedIn && 
                    <LinkContainer to='/create'>
                        <Button variant='outline-primary' >+ Create post</Button>
                    </LinkContainer>}
                </Col>
            </Row>
            <Row>
                <Stack gap={3}>
                    {posts}
                </Stack>
            </Row>
        </Container>
    )
}

export default Posts

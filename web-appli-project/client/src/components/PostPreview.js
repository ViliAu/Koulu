import {React, useState, useEffect} from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UserImage from './UserImage';
import LoadingSpinner from './LoadingSpinner';

const PostPreview = ({post}) => {
    const [author, setAuthor] = useState(null);
    const textPreview = post.text.substring(0, 150) + (post.text.substring(0, 150).length === 150 ? '...' : '');

    useEffect(() => {
        let mounted = true;
        // Get user data from backend API
        async function fetchAuthor() {
            try {
                const req = await fetch(`/api/user/getuser?id=${post.author}`);
                const data = await req.json();
                if (mounted) {
                    if (req.ok) {
                        setAuthor(data.user);
                    }
                }
            }
            catch { }
        }
        fetchAuthor();
        return () => {
            mounted = false;
        }
    }, [post]);
    if (author) {
        return (
            <Link to={post.id} style={{ textDecoration: 'none' }}>
                <Card bg='dark' variant='dark' text='light' border='secondary'>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col xs={'auto'}>
                                <div className='text-center'>{post.likes}</div>
                                <div className='text-center' style={{ fontSize: 10 }}>rating</div>
                            </Col>
                            <Col>{textPreview}</Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col xs={'auto'} style={{marginRight: -15}}>
                                <UserImage id={author.image} size={25} className={'align-top'} />{' '}
                            </Col>
                            <Col xs={'auto'}>{author.name}</Col>
                            <Col></Col>
                            <Col xs={'auto'} className='text-muted'>Last edited: {DateTime.fromISO(post.lastEdited).toLocaleString(DateTime.DATETIME_MED)}</Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Link>
        )
    }
    else {
        return (
            <LoadingSpinner />
        );
    }
}



export default PostPreview;

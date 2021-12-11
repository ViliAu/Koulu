import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

const PostPreview = () => {
    let post = {};
    post.header = "POST HEADER";
    post.contentPreview = "Post content preview ost content preview ost content preview ost content preview ost content preview ost content preview";
    post.timeStamp = "05/06/1998";
    post.rating = 0;
    post.commentAmount = 0;
    post.author = {}
    post.author.name = "UUSERI557"

    return (
        <Card bg='dark' variant='dark' text='light' border='secondary'>
            <Card.Header>{post.header}</Card.Header>
            <Card.Body>
                <Row>
                    <Col xs={'auto'}>
                        <div className='text-center'>{post.rating}</div>
                        <div className='text-center' style={{ fontSize: 10 }}>rating</div>
                    </Col>
                    <Col>{post.contentPreview}</Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col xs={'auto'}>
                        <img
                            alt=''
                            src='logo192.png'
                            width='25'
                            height='25'
                            className='align-top'
                        />{' '}
                        {post.author.name}
                    </Col>
                    <Col></Col>
                    <Col xs={'auto'} className='text-muted'>{post.timeStamp}</Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}



export default PostPreview;

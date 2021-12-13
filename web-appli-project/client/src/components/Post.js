import React from 'react';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Post = ({ id }) => {
    return (
        <>
            <Container id='postBody' text='light' style={{ padding: 20, marginTop: 20, backgroundColor: '#1A1C1E', borderRadius: 8 }} >
                <Row xs={'auto'}>
                    <Col>
                        <LinkContainer to={'/posts'} style={{ marginBottom: 10 }}>
                            <Button >{`← Back`}</Button>
                        </LinkContainer>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 id='postHeader'>POST {id} HEADER</h3>
                        <Row>
                            <Col xs={'auto'}>
                            {'by:  '}
                            <img
                                alt=''
                                src={'/defaultusericon.png'}
                                width='25'
                                height='25'
                                className='align-top'
                            />{' '}
                            AUTHOR123
                            </Col>
                            <Col>
                            <p className='text-muted align-bottom' id='postTimestamp' style={{fontSize:12}}>on 27/5/2021 (last edited on 27/5/2021)</p>
                            </Col>
                            <hr />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={'auto'}>
                        <Rating rating={5} />
                    </Col>
                    <Col>
                        <Container id='postBody'>
                        </Container>
                        <Container id='postCode'>
                            <pre><code></code></pre>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Comment />
            <Comment />
            <CommentForm />
        </>
    )
}
/*
ADD EDITING AND DELETING POSSIBILITY HERE
const NavigationButtons = () => {
    
};*/

const Rating = ({ rating }) => {
    return (
        <Container className='text-center'>
            <div style={{ fontSize: 15 }}>▲</div>
            <div style={{ fontSize: 15 }}>{rating}</div>
            <div style={{ fontSize: 15 }}>ᐁ</div>
        </Container>
    );
}

const Comment = ({ comment }) => {
    return (
        <Container id='postBody' text='light' style={{ padding: 20, marginTop: 20, backgroundColor: '#1A1C1E', borderRadius: 8 }} >
            <Row>
                <Col>
                    <h5 id='postHeader'>Comment header</h5>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col xs={'auto'}>
                    <Rating rating={5} />
                </Col>
                <Col>
                    <Container id='postBody'>
                    </Container>
                    <Container id='postCode'>
                        <pre><code></code></pre>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

const CommentForm = () => {
    return (
        <Container id='commentForm' text='light' style={{ padding: 20, marginTop: 20, backgroundColor: '#1A1C1E', borderRadius: 8 }} >
            <Row>
                <Col>
                    <h5 id='commentHeader'>Write a comment</h5>
                </Col>
            </Row>
            <hr />
            <Form>
                <Form.Group className="mb-3" controlId="commentForm.header">
                    <Form.Label>Comment subject</Form.Label>
                    <Form.Control as="textarea" rows={1} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="commentForm.body">
                    <Form.Label>Comment text</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default Post

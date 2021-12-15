import {React, useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from './Rating';

const Comment = ({ comment }) => {

    return (
        <Container id='postBody' text='light' style={{ padding: 20, marginTop: 20, backgroundColor: '#1A1C1E', borderRadius: 8 }} >
            <Row>
                <Col>
                    <h5 id='postHeader'>{comment.title}</h5>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col xs={'auto'}>
                    <Rating rating={5} />
                </Col>
                <Col>
                    <Container id='postBody'>
                        {comment.text}
                    </Container>
                    <Container id='postCode'>
                        <pre><code></code></pre>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Comment;
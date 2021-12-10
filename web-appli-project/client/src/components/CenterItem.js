import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CenterItem = (props) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs lg='2'></Col>
                <Col xs={'auto'} >{props.children}</Col>
                <Col xs lg='2'></Col>
            </Row>
        </Container>
    )
}

export default CenterItem
    ;
import React from 'react';
import { Container } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div>
            <Container className='text-center'>
                <img
                    alt=''
                    src='logo192.png'
                />
                <h1 className='display-1'>Welcome to OP coding site</h1>
                <h1 className='lead'>The world's most popular place for desperate developers</h1>
                <h3 className='display-7'>Currently having 0 posts from 0 users</h3>
            </Container>
        </div>
    );
}

export default HomePage;

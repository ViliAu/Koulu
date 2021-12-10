import React from 'react';
import CenterItem from './CenterItem';
import '../styles/HomePageStyle.css';

const HomePage = () => {
    return (
        <div>
            <CenterItem>
                <img
                    alt=''
                    src='logo192.png'
                />
            </CenterItem>
            <h1 className='display-1'>Welcome to OP coding site</h1>
            <h1 className='lead'>The world's most popular place for desperate developers</h1>
            <h3 className='display-7'>Currently having 0 posts from 0 users</h3>
        </div>
    );
}

export default HomePage;

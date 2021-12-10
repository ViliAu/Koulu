import React from 'react';
import Helmet from 'react-helmet';
import CenterItem from './CenterItem';

const NotFound = () => {
    return (
        <div className='notFound'>
            <Helmet>
                <title>Site nout found!</title>
            </Helmet>
            <CenterItem>
                <img
                    alt=''
                    src='logo192.png'
                />
            </CenterItem>
            <h1>404 - Site doesn't exist<br/><a href='/'>Home</a></h1>
        </div>
    )
}

export default NotFound;

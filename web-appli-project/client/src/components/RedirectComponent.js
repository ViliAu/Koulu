import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectComponent = ({redirect}) => {
    return (redirect !== '') && <Navigate to={redirect} />
}

export default RedirectComponent

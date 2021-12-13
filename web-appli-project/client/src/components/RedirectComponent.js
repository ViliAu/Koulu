import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectComponent = ({redirect, address}) => {
    return redirect ? <Navigate to={address} /> : <></>
}

export default RedirectComponent

import React from 'react'

import Container from 'react-bootstrap/Container';

const Rating = ({ user, rating, userRating, id }) => {

    const handleRating = async (event) => {
        let rating = event.target.id;
        if (rating === userRating) {
            rating = 0;
        }
        if (!id) {
            return;
        }
        try {
            let ratingData = {};
            ratingData.rating = rating;
            const req = await fetch(`/api/post/rate?id=${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('auth_token') },
                body: JSON.stringify(ratingData)
            });
            const data = await req.json();
            if (data.success) {
                window.location.reload();
            }
            else {
                alert(data.error);
            }
        }
        catch (e){
            console.log(e);
        }
    };

    return (
        <Container className='text-center noselect'>
            <div id='1' onClick={handleRating} style={{ fontSize: 18 }}>{user ? userRating > 0 ? '▲' : '△' : ' '}</div>
            <div style={{ fontSize: 15 }}>{rating}</div>
            <div id='-1' onClick={handleRating} style={{ fontSize: 18 }}>{user ? userRating < 0 ? '▼' : '▽' : ' '}</div>
        </Container>
    );
}

export default Rating;

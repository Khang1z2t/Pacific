import React from 'react';

const Card = ({title,img}) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{img}</p>
            {/* <p>{...props}</p> */}
        </div>
    );
}

export default Card;
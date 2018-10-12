import React from "react";


const Star = props => {
    return (
        <i className="fas fa-star text-warning"></i>
    );
}

const HalfStar = props => {
    return (
        <i className="fas fa-star-half text-warning"></i>
    );
}

export const renderStars = (rating) => {
    let m = Math.floor(rating);
    let n = parseFloat((rating - m).toFixed(1));

    let stars =[];

    for (let i = 0; i < m; i++) {
        stars.push(<Star key={i} />);
    }
    
    if (0.2 < n && n <= 0.7) {
        stars.push(<HalfStar key={-2} />);
    } else if (n > 0.7) {
        stars.push(<Star key={-1} />);
    }
    return stars;
}
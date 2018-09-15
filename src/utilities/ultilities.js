import React from "react";
export const renderStars = (rating) => {
    let m = Math.floor(rating);
    let n = parseFloat((rating - m).toFixed(1));

    let star = <i className="fas fa-star text-warning"></i>;
    let half_star = <i className="fas fa-star-half text-warning"></i>

    let stars =[];

    for (let i = 0; i < m; i++) {
        stars.push(star);
    }
    
    if (0.2 < n && n <= 0.7) {
        stars.push(half_star);
    } else if (n > 0.7) {
        stars.push(star);
    }
    return stars;
}
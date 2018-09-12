export const renderStars = (rating) => {
  let m = Math.floor(rating);
  let n = parseFloat((rating - m).toFixed(1));

  let stars = '';
  for (let i = 0; i < m; i++) {
      stars += `<i class="fas fa-star"></i> `;
  }

  if (n <= 0.2) {
      stars += "";
  } else if (0.2 < n && n <= 0.7) {
      stars += `<i class="fas fa-star-half"></i>`;
  } else if (n > 0.7) {
      stars += `<i class="fas fa-star"></i>`;
  }
  return stars;
}
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
  }

  if (hasHalfStar) {
    stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
  }

  while (stars.length < 5) {
    stars.push(
      <i key={"empty" + stars.length} className="bi bi-star text-warning"></i>
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;

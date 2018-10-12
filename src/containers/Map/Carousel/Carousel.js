import React from 'react';
import { TEMP_API_KEY } from './../../App';

// This component receive allPhotos, and name of a restaurant (from Map)
// then display all photos in form of a carousel

class carousel extends React.Component {
  // map through the array of photos and returns new array with carousel-item format (bootstrap 4)
  constructor(props) {
    super(props);
    this.carousel = undefined;
  }

  carouselOnMounted = ref => {
    this.carousel = ref;
  };

  componentDidMount() {
    setTimeout(() => {
      document.getElementById(
        'carousel'
      ).parentElement.parentElement.parentElement.parentElement.style.textAlign =
        'center';
    }, 0);
  }

  render() {
    let photosCarousel = null;
    const { allPhotos, restaurantName } = this.props;

    if (allPhotos) {
      photosCarousel = allPhotos.map((photo, index) => {
        if (index === 0) {
          // we need to active the first photo
          return (
            <div key={photo.photo_reference} className="carousel-item active">
              <img
                className="d-block"
                style={{ width: '100%', height: 250 }}
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${
                  photo.photo_reference
                }&key=${TEMP_API_KEY}`}
                alt={`${restaurantName}`}
              />
            </div>
          );
        }

        return (
          <div key={photo.photo_reference} className="carousel-item">
            <img
              className="d-block"
              style={{ width: '100%', height: 250 }}
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${
                photo.photo_reference
              }&key=${TEMP_API_KEY}`}
              alt={`${restaurantName}`}
            />
          </div>
        );
      });
    }

    return (
      // using bootstrap 4 template for carousel
      <div id="carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">{photosCarousel}</div>

        <a className="carousel-control-prev" href="#carousel" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#carousel" data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>
      </div>
    );
  }
}

export default carousel;

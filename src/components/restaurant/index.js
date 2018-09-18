import React from "react";
import StaticInfo from "./staticInfo";
import DynamicInfo from "./dynamicInfo/index";

class Restaurant extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showDynamicInfo: false
    }
  }

  toggleDynamicInfoHandler = (e) => {
    this.setState((prevState, props)=> {
      return {
        showDynamicInfo: !prevState.showDynamicInfo
      }
    })
  }

  render() {

    let dynamicInfo = null;

    if (this.state.showDynamicInfo) {

      dynamicInfo = <DynamicInfo 
                      reviews={this.props.reviews}
                      place_id={this.props.info.place_id} />
    }

    return(
      <div className="restaurant bg-secondary">
        <StaticInfo 
          restaurantAddress={this.props.info.formatted_address}
          restaurantName={this.props.info.name}
          restaurantRating={this.props.info.rating}
          toggleDynamicInfo={this.toggleDynamicInfoHandler} />
        {dynamicInfo}
      </div>
    );
  }
}

export default Restaurant;



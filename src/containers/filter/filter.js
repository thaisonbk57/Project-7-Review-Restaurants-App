import React, {Component} from "react";
import FilterBtn from "./filterBtn/filterBtn";
import StarInput from "./starInput/starInput";
import withType from "./../../HOC/withType";
import {connect} from "react-redux";
import {updateFilterObject,filterRestaurants} from "./../../store/actions";
import FilterStar from './starInput/starInput';


class Filter extends Component {
  constructor(props) {
    super(props);
    this.state ={
      star: {
        from: 1,
        to: 5
      }
    }
  }

  onChangeHandler = (e) => {
    let target = e.target;
    let stars = target.value;
    this.setState((prevState, props) => {
      return {
        star: {
          ...prevState.star,
          from: stars
        }
      }
    });
  }

  componentDidUpdate() {
    this.props.updateFilter(this.state.star);
    this.props.filterRestaurants(this.state.star);
  }

  render() {
    return (
      <div className="h-100 bg-warning">
        <div className="text-center p-5 h-100">
          <FilterStar onchange={this.onChangeHandler}/>
        </div>
      </div>
    );  
  }
}

const mapState = state => {
  return {

  }
}

const mapDispatch = dispatch => {
  return {
    updateFilter: (filterObj) => {dispatch(updateFilterObject(filterObj))},
    filterRestaurants: (filterObj) => {dispatch(filterRestaurants(filterObj))}
  }
}

export default connect(mapState, mapDispatch)(Filter);
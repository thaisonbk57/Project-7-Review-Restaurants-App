import React, {Component} from "react";
import FilterBtn from "./filterBtn/filterBtn";
import StarInput from "./starInput/starInput";
import withType from "./../../HOC/withType";

const StarFrom = withType(StarInput, "from");
const StarTo = withType(StarInput, "to");

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
    let dataType = target.dataset.type;
    let stars = parseInt(target.value, 10);

    switch (dataType) {
      case "from":
        stars = stars > 4 ? 4 : stars < 1 ? 1 : stars >= this.state.star.to ? this.state.star.to - 1 : stars;
        this.setState((prevState, props) => {
          return {
            star: {
              ...prevState.star,
              from: stars
            }
          }
        });
        break;
      case "to":
        stars = stars < 2 ? 2: stars > 5 ? 5 : stars <= this.state.star.from ? this.state.star.from + 1 : stars;
        this.setState((prevState, props) => {
        return {
          star: {
              ...prevState.star,
              to: stars
            }
          }
        });
      break;

      default:
        return null
    }
  }

  render() {
    return (
      <div className="h-100 bg-warning">
        <div className="py-5 text-center h-100">
          <StarFrom onChangeHandler = {this.onChangeHandler} value={this.state.star.from} />
          <StarTo onChangeHandler = {this.onChangeHandler} value={this.state.star.to} />
          <FilterBtn>Filter</FilterBtn>
        </div>
      </div>
    );  
  }
}
export default Filter;
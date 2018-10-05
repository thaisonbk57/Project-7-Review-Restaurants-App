import React, { Component } from 'react';
import Name from './name';
import Comment from './comment';
import SubmitBtn from './submmitBtn';
import RatingStar from './ratingStar/ratingStar';
import { connect } from 'react-redux';
import './commentForm.css';
import { addComment, closeCommentForm } from '../../store/actions';

const getTimeStamp = () => {
  // this function generate unique key for each review of users
  let now = new Date();
  return now.getTime();
};

class addCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author_name: '',
      rating: 5,
      text: ''
    };
  }

  onChangeHander = e => {
    let value = e.target.value;
    switch (e.target.name) {
      case 'author':
        this.setState({
          author_name: value
        });
        break;
      case 'comment_text':
        this.setState({
          text: value
        });
        break;
      case 'star':
        this.setState({
          rating: parseInt(value, 10)
        });
        break;
      default:
        return null;
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();
  };

  render() {
    let form = null;
    if (this.props.active) {
      form = (
        <div className="form-backdrop">
          <div onClick={this.props.closeCommentForm} className="close-btn">
            <i class="far fa-window-close" />
          </div>
          <form
            autoComplete="off"
            className="AddCommentForm border border-success px-5 py-2 rounded"
            onSubmit={e => {
              this.onSubmitHandler(e);
              this.props.addComment(
                { ...this.state, time: getTimeStamp() },
                this.props.targetRestaurant
              );
            }}
          >
            <label className="text-light" htmlFor="">
              Name: <span className="text-danger">*</span>
            </label>
            <Name onchange={this.onChangeHander} />
            <br />
            <RatingStar onchange={this.onChangeHander} />
            <br />
            <label className="text-light" htmlFor="">
              Comment:
            </label>
            <Comment onchange={this.onChangeHander} />
            <br />
            <SubmitBtn />
          </form>
        </div>
      );
    }
    return form;
  }
}

const mapState = state => {
  return {
    active: state.activeCommentForm,
    targetRestaurant: state.activeRestaurant
  };
};

const mapDispatch = dispatch => {
  return {
    addComment: (commentObject, targetRestaurant) => {
      dispatch(addComment(commentObject, targetRestaurant));
    },
    closeCommentForm: () => {
      dispatch(closeCommentForm());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(addCommentForm);

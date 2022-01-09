import React from 'react';
import PostModal from './modal';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <nav className="bg-white border-bottom border-1">
          <div className="background"></div>
          <div className="container d-flex justify-content-between align-items-center">
            <img className="logo" src="pipergramlogo.png" />
            <div className="icons">
              <Link to="/">
                <img className="home-icon" src="house-solid.svg" />
              </Link>
              <img
                onClick={this.handleShow}
                className="create-icon"
                src="edit-regular.svg"
              />
              <img className="heart-icon" src="heart-regular.svg" />
              <Link to="/profile">
                <img className="profile-icon rounded-circle" src="pfp.jpeg" />
              </Link>
            </div>
          </div>
        </nav>
        <PostModal show={this.state.showModal} handleClose={this.handleClose} />
      </>
    );
  }
}

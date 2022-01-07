import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCreatingPost: false };
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }

  handleCreatePost(event) {
    if (event.target.className === 'create-icon') {
      this.setState({ isCreatingPost: true });
    }
  }

  render() {
    return (
      <nav className="bg-white border-bottom border-1">
        <div className="background"></div>
        <div className="container d-flex justify-content-between align-items-center">
          <img className="logo" src="pipergramlogo.png" />
          <div className="icons">
            <img className="home-icon" src="house-solid.svg" />
            <img onClick={this.handleCreatePost} className="create-icon" src="edit-regular.svg" />
            <img className="heart-icon" src="heart-regular.svg" />
            <img className="profile-icon rounded-circle" src="pfp.jpeg" />
          </div>
        </div>
      </nav>
    );
  }
}

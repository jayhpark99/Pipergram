import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navigation-bar d-flex justify-content-between align-items-center bg-white border-bottom border-1">
        <img className="logo" src="pipergramlogo.png" />
        <div className="icons"><img className="home-icon" src="house-solid.svg" />
          <img className="create-icon" src="edit-regular.svg" />
          <img className="heart-icon" src="heart-regular.svg" />
          <img className="profile-icon rounded-circle" src="pfp.jpeg" />
        </div>
      </nav>
    );
  }
}

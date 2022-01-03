import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar d-flex justify-content-between">
        <img src="pipergramlogo.png" />
        <img src="house-solid.svg" />
      </nav>
    );
  }
}

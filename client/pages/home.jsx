import React from 'react';
import Navbar from '../components/navbar';
import Post from '../components/post';

export default class Home extends React.Component {

  render() {
    return (
    <div className="home container">
      <Navbar />
      <Post />
    </div>
    );
  }
}

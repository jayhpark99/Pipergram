import React from 'react';
import Navbar from '../components/navbar';
import Post from '../components/post';

export default function Home() {
  return (
    <div className="home container">
      <Navbar />
      <Post />
    </div>
  );
}

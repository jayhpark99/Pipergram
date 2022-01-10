import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  render() {
    fetch('/api/posts', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ posts: result });
      })
      .catch(err => console.error(err));
    return (
    <ul>
     { this.state.posts.map(post => {
       return (
         <li key={post.photoId}>
          <div className="post bg-white">
                <div className="header ms-2">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img className="profile-icon rounded-circle m-2" src={post.profilePicture} />
                    </div>
                    <div className="col">
                      <p className="username"><strong>{post.username}</strong></p>
                      <p className="location">{post.location}</p>
                    </div>
                  </div>
                </div>
                <img className="post-picture w-100" src={post.postPicture} alt="post" />
                <div className="footer ms-2">
                  <div className="comment-section">
                    <p className="caption"><strong>{post.username}</strong> {post.caption}</p>
                    <p className="time text-secondary">16 HOURS AGO</p>
                  </div>
                </div>
              </div>
         </li>
       );
     })}
    </ul>

    );
  }
}

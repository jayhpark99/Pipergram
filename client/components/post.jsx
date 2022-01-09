import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    fetch('/api/posts', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ posts: result });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
    <ul>
     { this.state.posts.map((post, index) => {
       return (
         <li key={this.state.posts[index].photoId}>
          <div className="post bg-white">
                <div className="header ms-2">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img className="profile-icon rounded-circle m-2" src="pfp.jpeg" />
                    </div>
                    <div className="col">
                      <p className="username"><strong>jay_park99</strong></p>
                      <p className="location">Yosemite</p>
                    </div>
                  </div>
                </div>
                <img className="post-picture w-100" src="background.png" alt="post" />
                <div className="footer ms-2">
                  <img className="heart-icon" src="heart-regular.svg" alt="heart" />
                  <img className="comment-icon" src="comment-regular.svg" alt="comment" />
                  <div className="comment-section">
                    <p className="mt-2" ><strong>0 likes</strong></p>
                    <p className="caption"><strong>jay_park99</strong> I took this picture at yosemite cool</p>
                    <p className="comment-1"><strong>myfriend123</strong> wow i went there yesterday too</p>
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

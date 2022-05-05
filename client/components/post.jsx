import React from 'react';
import TimeAgo from 'timeago-react';
import AppContext from '../lib/app-context';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { userId } = this.context.user;
    const photoId = event.target.closest('li').getAttribute('photoid');
    const data = { userId, photoId };
    if (event.target.className === 'far fa-heart heart-icon fa-2x') {
      fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).catch(err => console.error(err));
      event.target.className = 'fas fa-heart heart-icon fa-2x';
    } else if (event.target.className === 'fas fa-heart heart-icon fa-2x') {
      fetch('/api/likes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).catch(err => console.error(err));
      event.target.className = 'far fa-heart heart-icon fa-2x';
    }
  }

  // componentDidMount() {
  //   const { userId } = this.context.user;
  //   fetch('/api/likes', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(userId)
  //   })
  //     .then(res => {
  //       console.log(res);
  //       res.json();
  //     })
  //     .then(result => {
  //       console.log(result);
  //     })
  //     .catch(err => console.error(err));
  // }

  render() {
    const { handleClick } = this;
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
         <li key={post.photoId} photoid={post.photoId}>
           <div className="post bg-white">
             <div className="header ms-2">
               <div className="row align-items-center">
                 <div className="col-1">
                   <img
                     className="profile-icon rounded-circle m-2"
                     src={post.profilePicture}
                   />
                 </div>
                 <div className="col">
                   <p className="username">
                     <strong>{post.username}</strong>
                   </p>
                   <p className="location">{post.location}</p>
                 </div>
               </div>
             </div>
             <img
               className="post-picture w-100"
               src={post.postPicture}
               alt="post"
             />
             <div className="footer ms-2">
               <i onClick={handleClick} className="far fa-heart heart-icon fa-2x"></i>
               <div className="comment-section">
                 <p className="caption">
                   <strong>{post.username}</strong> {post.caption}
                 </p>
                 <TimeAgo
                   datetime={post.createdAt}
                   locale="vi"
                   className="time text-secondary"
                 />
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
Post.contextType = AppContext;

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AppContext from '../lib/app-context';

export default class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postPicture: 'placeholder.png',
      location: '',
      caption: ''
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }

  handleChange(event) {
    if (event.target.getAttribute('type') === 'file') {
      this.setState({
        postPicture: URL.createObjectURL(event.target.files[0])
      });
    } else {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
  }

  handleCreatePost(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('react-context-jwt');
    const formData = new FormData();
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('location', this.state.location);
    formData.append('caption', this.state.caption);
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'X-Access-Token': token
      },
      body: formData
    })
      .then(() => {
        this.props.handleClose();
        this.setState({ postPicture: 'placeholder.png' });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { show, handleClose } = this.props;
    const { handleChange, handleCreatePost } = this;
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="sm"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleCreatePost}>
            <Modal.Body>
              <img
                src={this.state.postPicture}
                className="w-100 mb-3"
                alt="placeholder-pfp"
              />
              <input
                onChange={handleChange}
                className="form-control bg-background mb-2"
                type="file"
                name="postPicture"
                id="formFile"
                ref={this.fileInputRef}
                required
              />
              <input
                onChange={handleChange}
                className="form-control bg-background ps-2 mb-2"
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                required
              />
              <input
                onChange={handleChange}
                className="form-control bg-background ps-2 mb-2 pb-5"
                type="text"
                name="caption"
                id="caption"
                placeholder="Caption..."
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" className="w-100" variant="primary">
                Create Post
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

PostModal.contextType = AppContext;

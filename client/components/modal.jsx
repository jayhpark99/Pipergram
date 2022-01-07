import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postPicture: 'placeholder.png',
      location: '',
      caption: ''
    };
    this.fileInputRef = React.createRef();
  }

  render() {
    return (
    <>
      <div className="background">
          <Modal.Dialog scrollable>
          <Modal.Header closeButton>
          </Modal.Header>

          <Modal.Body>
              <img src="placeholder.png"
                className="w-100 mb-3"
                alt="placeholder-pfp" />
              <input
                className="form-control bg-background mb-2"
                type="file"
                name="postPicture"
                id="formFile"
                ref={this.fileInputRef} required/>
              <input
                className="form-control bg-background ps-2 mb-2"
                type="text"
                name="location"
                id="location"
                placeholder="Location" required />
              <input
                className="form-control bg-background ps-2 mb-2 pb-5"
                type="text"
                name="caption"
                id="caption"
                placeholder="Caption..." required />
          </Modal.Body>

          <Modal.Footer>
            <Button className="w-100" variant="primary">Create Post</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>);
  }
}

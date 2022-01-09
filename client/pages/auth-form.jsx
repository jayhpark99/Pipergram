import React from 'react';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigningUp: true,
      profilePicture: 'pfp.jpeg',
      fullName: '',
      username: '',
      password: ''
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    if (event.target.getAttribute('type') === 'file') {
      this.setState({ profilePicture: URL.createObjectURL(event.target.files[0]) });
    } else {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
  }

  handleSignUp(event) {
    event.preventDefault();
    this.setState({ isSigningUp: false });
    const formData = new FormData();
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('fullName', this.state.fullName);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    fetch('/api/auth/sign-up', {
      method: 'POST',
      body: formData
    })
      .then(res => {
        res.json();
      })
      .catch(err => console.error(err));
  }

  handleSignIn(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.onSignIn(result);
        } else {
          alert('invalid login');
        }
      })
      .catch(err => console.error(err));
  }

  handleClick(event) {
    this.setState({ isSigningUp: !this.state.isSigningUp, profilePicture: 'pfp.jpeg' });
  }

  render() {
    const { handleChange, handleSignUp, handleSignIn, handleClick } = this;
    if (this.state.isSigningUp === true) {
      return (
        <>
          <div className="auth-form container">
            <div className="row mb-1">
              <div className="border border-1 bg-white">
                <form
                  onSubmit={handleSignIn}
                  className="form-control needs-validation d-flex flex-column text-center p-4 border-0"
                >
                  <img
                    src="pipergramlogo.png"
                    className="w-75 mx-auto"
                    alt="logo"
                  />
                  <input
                    onChange={handleChange}
                    className="form-control bg-background ps-2 mb-2"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                  />
                  <input
                    onChange={handleChange}
                    className="form-control bg-background ps-2 mb-3"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                  <button className="btn btn-primary mt-3">
                    <b>Log In</b>
                  </button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="border border-1 bg-white text-center pt-3">
                <p>
                  {"Don't Have an Account? "}
                  <a
                    onClick={handleClick}
                    className="text-decoration-none text-primary"
                    href="#sign-in"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
         <>
          <div className="auth-form container pb-5">
            <div className="row mb-1">
              <div className="border border-1 bg-white">
                <form onSubmit={handleSignUp}
                  className="form-control needs-validation d-flex flex-column text-center p-4 border-0">
                  <img src="pipergramlogo.png"
                    className="w-75 mx-auto"
                    alt="logo" />
                  <h6 className="text-muted">Sign up to see photos and videos from your friends.</h6>
                  <img src={this.state.profilePicture}
                    className="pfp rounded-circle border border-1 w-75 mx-auto mb-3"
                    alt="placeholder-pfp" />
                  <input
                    onChange={handleChange}
                    className="form-control bg-background mb-2"
                    type="file"
                    name="profilePicture"
                    id="formFile"
                    ref={this.fileInputRef} />
                  <input onChange={handleChange}
                    className="form-control bg-background ps-2 mb-2"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Full Name" required />
                  <input onChange={handleChange}
                    className="form-control bg-background ps-2 mb-2"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username" required />
                  <input onChange={handleChange}
                    className="form-control bg-background ps-2 mb-3"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password" required />
                  <button className="btn btn-primary mt-3"><b>Sign Up</b></button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="border border-1 bg-white text-center pt-3">
                <p>{'Have an account? '}
                  <a onClick={handleClick}
                     className="text-decoration-none text-primary"
                     href="#sign-up">Log in</a>
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

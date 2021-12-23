import React from 'react';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pfpUrl: '',
      fullName: '',
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json());
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <div className="auth-form container">
          <div className="row mb-1">
            <div className="border border-1 bg-white">
              <form onSubmit={handleSubmit}
                    className="form-control needs-validation d-flex flex-column text-center p-4 border-0">
                <img src="pipergramlogo.png"
                     className="w-75 mx-auto"
                     alt="logo" />
                <h6 className="text-muted">Sign up to see photos and videos from your friends.</h6>
                <img src="pfp.jpeg"
                     className="rounded-circle border border-1 w-75 mx-auto mb-3"
                     alt="placeholder-pfp" />
                <input onChange={handleChange}
                       className="form-control bg-background mb-2"
                       type="file"
                       name="pfpUrl"
                       id="formFile" required/>
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
                <button className="btn btn-primary"><b>Sign Up</b></button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="border border-1 bg-white text-center pt-3">
              <p>Have an account? <a className="text-decoration-none text-primary" href="#">Log in</a></p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

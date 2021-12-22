import React from 'react';

export default function Auth(props) {
  return (
    <>
      <div className="auth-form mx-auto mt-5">
        <div className="row mb-1">
          <div className="border border-1 bg-white">
            <form className="d-flex flex-column text-center p-3">
              <img src="pipergramlogo.png" alt="logo"/>
              <h2>Sign up to see photos and videos from your friends.</h2>
              <img className="rounded-circle border border-1 w-50 mx-auto mb-3" src="pfp.jpeg" alt="placeholder-pfp"/>
              <input type="text" name="fullname" id="fullname" placeholder="Full Name" required />
              <input type="text" name="pfp" id="pfp" placeholder="Photo URL" />
              <input type="text" name="username" id="username" placeholder="Username" required />
              <input type="password" name="password" id="password" placeholder="Password" required />
              <button className="btn btn-primary">Sign Up</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="border border-1 bg-white text-center pt-3">
            <p>Have an account? <a href="#">Log in</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

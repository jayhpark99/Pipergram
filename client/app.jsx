import React from 'react';
// import Auth from './components/auth-form';
import Home from './pages/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user, isAuthorizing: false });
  }

  render() {
    // if (this.state.isAuthorizing === true) return <Auth onSignIn={this.handleSignIn} />;
    return <Home />;
  }
}

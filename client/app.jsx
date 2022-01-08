import React from 'react';
import AppContext from './lib/app-context';
import Auth from './components/auth-form';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    }, false);
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    if (user) {
      this.setState({ user, isAuthorizing: false });
    }
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user, isAuthorizing: false });
  }

  render() {
    const { user } = this.state;
    const contextValue = { user };
    if (this.state.isAuthorizing === true) {
      return <Auth onSignIn={this.handleSignIn} />;
    }
    return (
      <AppContext.Provider value={contextValue}>
        <Home />
      </AppContext.Provider>
    );
  }
}

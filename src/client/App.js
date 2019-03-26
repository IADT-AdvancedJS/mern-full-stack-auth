import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import Register from './Register';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(props) {
    axios.get('api/logout')
      .then(res => {
        this.setState({loggedIn: false});
        props.history.push('/');
      })
      .catch( err => console.log(err));
    return null;
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" render={this.logout}/>
        </Switch>
      </div>
    );
  }
}

export default App;

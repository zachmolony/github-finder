import React, { Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Alert from './layout/Alert';
import Users from "./users/Users";
import Search from './users/Search';
import About from './pages/About';
import User from './pages/User'
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // Fetch users
  async componentDidMount() {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users?client_id=$
      {process.env.REACT_APP_CLIENT_ID}&client_secret=$
      {REACT_APP_CLIENT_SECRET}`)
    this.setState({ users: res.data, loading: false })
  }

  // Search users
  searchUsers = async text => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, loading: false })
  }

  // Get single user
  getUser = async username => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
    this.setState({ user: res.data, loading: false })
  }

  // Clear users
  clearUsers = () => this.setState({ users: [], loading: false })

  // Create alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type }})
    setTimeout(() => this.setState({alert: null}), 2500)
  }

  render() { 
    const { users, user, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render= {props => (
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={ users.length > 0 ? true : false } 
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                <User {...props} getUser={this.getUser} user={user} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

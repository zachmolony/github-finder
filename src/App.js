import React from 'react';
import axios from 'axios';
import Navbar from './layout/Navbar'
import Users from "./users/Users";
import Search from './users/Search'
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users?client_id=$
      {process.env.REACT_APP_CLIENT_ID}&client_secret=$
      {REACT_APP_CLIENT_SECRET}`)
    this.setState({ users: res.data, loading: false })
  }

  render() { 
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;

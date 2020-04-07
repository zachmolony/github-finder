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

  // Clear users
  clearUsers = () => this.setState({ users: [], loading: false })

  render() { 
    const { users, loading } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClear={ users.length > 0 ? true : false } 
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;

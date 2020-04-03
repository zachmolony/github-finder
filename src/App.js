import React from 'react';

import Navbar from './layout/Navbar'
import Users from "./users/Users";

import './App.css';

class App extends React.Component {
  render() { 
    return (
      <div className="App">
        <Navbar />
        <Users />
      </div>
    );
  }
}

export default App;

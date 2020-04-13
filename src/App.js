import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from "./components/users/Users";
import Search from './components/users/Search';
import About from './components/pages/About';
import User from './components/pages/User';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Fetch users
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users?client_id=$
        {process.env.REACT_APP_CLIENT_ID}&client_secret=$
        {REACT_APP_CLIENT_SECRET}`)
      setUsers(res.data)
      setLoading(false)
      // eslint-disable-next-line
    };
    fetchData()
  }, []);

  // Create alert
  const createAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2500)
  };

  return (
    <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route exact path="/" render= {props => (
                  <Fragment>
                    <Search setAlert={createAlert} />
                    <Users />
                  </Fragment>
                )} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
              </Switch>
            </div>
          </div>
        </Router>
    </GithubState>
  );
}

export default App;

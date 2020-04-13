import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const { users, clearUsers, searchUsers } = githubContext
    const { setAlert } = alertContext;

    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if (text.length === 0) {
            setAlert('Please enter something', 'danger')
        } else {
            searchUsers(text);
            setText('');
        }
    };

    const onChange = e => setText(e.target.value);

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input 
                    type="text" 
                    name="gh-name" 
                    placeholder="Find a Github user..." 
                    value={text} 
                    onChange={onChange} 
                />
                <input 
                    type="submit" 
                    value="Search" 
                    className="btn btn-dark btn-block" 
                />
            </form>
            {users.length > 0 && <button 
                className="btn btn-light btn-block" 
                onClick={clearUsers}
            >Clear
            </button>
            }
        </div>
    )
}

export default Search

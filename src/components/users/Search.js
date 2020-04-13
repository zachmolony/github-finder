import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ showClear, clearUsers, setAlert }) => {
    const context = useContext(GithubContext);
    console.log(context)

    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if (text.length === 0) {
            setAlert('Please enter something', 'danger')
        } else {
            context.searchUsers(text);
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
            {showClear && <button 
                className="btn btn-light btn-block" 
                onClick={clearUsers}
            >Clear
            </button>
            }
        </div>
    )
}

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
}

export default Search

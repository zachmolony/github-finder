import React, { Component } from 'react'

export class Search extends Component {
    state = {
        text: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input 
                        type="text" 
                        name="gh-name" 
                        placeholder="Search" 
                        value={this.state.text} 
                        onChange={this.onChange} 
                    />
                    <input 
                        type="submit" 
                        value="Search" 
                        className="btn btn-dark btn-block" 
                    />
                </form>
            </div>
        )
    }
}

export default Search

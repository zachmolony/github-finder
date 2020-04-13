import React, { useEffect, Fragment, useContext } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'
import GithubContext from '../../context/github/githubContext'

const User = ({ match }) => {
    const githubContext = useContext(GithubContext);
    const { getUser, getUserRepos, loading, user } = githubContext;

    useEffect(() => {
        getUser(match.params.login)
        getUserRepos(match.params.login)
        // eslint-disable-next-line
    }, []);

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    if (loading) return <Spinner />

    return <Fragment>
        <Link to='/' className='btn btn-light'>Back to Search</Link>
        Hireable {''}
        {hireable 
            ? <i className='fas fa-check text-success'></i> 
            : <i className='fas fa-times text-danger'></i>
        }
        <div className="card grid-2">
            <div className="all-center">
                <img src={avatar_url} alt="" className="round-img" style={{width: '150px'}}/>
                <h1>{name}</h1>
                <p>Location: {location}</p>
            </div>
            <div>
                {bio && ( <Fragment>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                    </Fragment> 
                )}
                <a href={html_url} className='btn btn-dark my-1'>Visit this user's Github profile</a>
                <ul>
                    <li>
                        <strong>Username: </strong> {login}
                    </li>
                    <li> {blog && <Fragment>
                            <strong>Website: </strong> <a href={blog}>{blog}</a>
                        </Fragment>
                    }
                    </li>
                    <li> {company && <Fragment>
                            <strong>Company: </strong> {company}
                        </Fragment>
                    }
                    </li>
                </ul>
            </div>
        </div>

        <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-danger">Public Repos: {public_repos}</div>
            <div className="badge badge-light">Public Gists: {public_gists}</div>
        </div>

        <Repos repos={repos} />
    </Fragment>
}

export default User

import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext()

const GithubProvider = ({children}) => {
    const [githubUser, setgithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers)

    //* request loading
    const [requests, setRequests] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({show:false, msg:''})

    //* check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
        .then(({ data }) => {
            let { rate: { remaining }} = data
            setRequests(remaining)
            if (remaining === 0) {
                //setError
                toggleError(true, 'You have exceeded requests limit')
            } 
        })
        .catch((err) => console.log(err))
    }
    //* error
    useEffect(() => {
        checkRequests()
    }, [])

    const toggleError = (show = false, msg = '') => {
        setError({ show, msg })
    }

    return <GithubContext.Provider value={{ githubUser, repos, followers, requests, loading, error }}>{children}</GithubContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(GithubContext)
}

export { GithubContext, GithubProvider }
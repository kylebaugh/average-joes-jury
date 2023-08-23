import { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import Login from './Login'

const Header = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userId)

    const sessionCheck = async () => {
        await axios.get('/sessionCheck')
            .then(res => {
                if (res.data.user) {
                    dispatch({
                        type: 'authenticated',
                        payload: res.data.user.userId
                    })
                    console.log(res.data.user)
                } else {
                    console.log(res.data)
                }

            })
    }

    const logout = async () => {
        await axios.get('/logout')
            .then(res => {
                dispatch({ type: 'logout' })
                console.log('User logged out')
                dispatch({ type: 'SET_SHOW', payload: 'search'})
            })
    }

    useEffect(() => {
        sessionCheck()
    }, [])

    return (
        <div id="navbar">
            <button className='nav-btn'>
                <NavLink to="/">Home</NavLink>
            </button>

            {user && <button className="nav-btn">
                <NavLink
                    to='/'
                    onClick={logout}
                >Logout</NavLink>
            </button>}


            {!user && <Login />}

        </div>
    )
}

export default Header
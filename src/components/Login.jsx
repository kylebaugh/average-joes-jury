import { useState, useEffect } from "react"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await axios.post('login', { username, password })
            .then(res => {
                console.log(res.data)
                dispatch({ 
                    type: 'authenticated', 
                    payload: res.data.user.userId 
                })
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    // useEffect()

    return (
        <div>
            <form onSubmit={handleSubmit}>

                Username: 
                <input 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />

                Password: 
                <input 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button>Login</button>
            </form>
        </div>
    )

}

export default Login
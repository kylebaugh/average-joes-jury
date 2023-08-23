import { useState, useEffect } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [badSubmit, setBadSubmit] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (login) {
            await axios.post('login', { username, password })
                .then(res => {
                    dispatch({
                        type: 'authenticated',
                        payload: res.data.userId
                    })
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            if (password === confirmPassword) {
                let body = {
                    username, 
                    password, 
                    confirmPassword,
                    firstName, 
                    lastName, 
                    imgUrl,
                }
                await axios.post('/adduser', body)
                    .then(res => {
                        dispatch({
                            type: 'authenticated',
                            payload: res.data.userId
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                setBadSubmit(true)
            }
        }
    }

    const toggleLogin = () => {
        setLogin(!login)
    }

    useEffect(() => {
        setTimeout(() => {
            console.log(`badSubmit: ${badSubmit}`)
            setBadSubmit(false)
        }, 4000)
    }, [badSubmit])

    return (
        <div>
            <form 
                id="loginForm"
                onSubmit={handleSubmit}>

                Username:
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={true}
                />

                Password:
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />

            {!login &&
            <div id="registerForm">

                {badSubmit && 
                <h4 id="badSubmit">Passwords did not match!</h4>
                }

                Confirm password:
                <input
                    placeholder="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={true}
                />
                {password !== confirmPassword && 
                <p id="badPw">Passwords do not match!</p>
                }

                First Name:
                <input 
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={true}
                />

                Last Name:
                <input 
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={true}
                />

                Image URL:
                <input 
                    placeholder="Image URL"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                />
           
                <button
                    type="submit"
                >Register
                </button>

                <a 
                    onClick={toggleLogin}
                >Need to Login? Click here
                </a>
            </div>
            }
            {login &&
            <div>
                <button
                    type="submit"
                >Login</button>
                <a 
                    onClick={toggleLogin}
                >Need to Register? Click here
                </a>
            </div>
            }

            </form>
            


        </div>
    )

}

export default Login
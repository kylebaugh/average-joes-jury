import { useState } from "react"
import axios from "axios"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('/login', {username, password})
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                Username: <input
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                Password: <input
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input 
                    type="submit"
                />

            </form>
        </div>
    )
}

export default Login
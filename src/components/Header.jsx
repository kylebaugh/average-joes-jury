import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Outlet } from "react-router-dom"
import Login from './Login'
import { Container, Row, Col } from "react-bootstrap"

const Header = () => {

  const dispatch = useDispatch()
  
  const userId = useSelector(state => state.userId)

  const sessionCheck = async () => {
    await axios.get('/sessionCheck')
      .then(res => {
        if (res.data.userId) {
          dispatch({
            type: 'authenticated',
            payload: res.data.userId
          })
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
    <Container fluid id="main">

      <Container id="navbar">
        <h3>Average Joe's Jury</h3>

        <Row className="d-flex justify-content-between">
          <Col xs={2}>
            <button className='nav-btn'>
              <NavLink to="/">Home</NavLink>
            </button>
          </Col>

          <Col xs={6}>
            {userId && 
            <button className="nav-btn">
              <NavLink
                to='/'
                onClick={logout}
                >Logout</NavLink>
            </button>
            }

            {!userId && 
            <Login />
            }
          </Col>
        </Row>

      </Container>
      
      <Row>
        <Outlet />
      </Row>

    </Container>
  )
}

export default Header
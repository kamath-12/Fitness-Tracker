import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Workouts from './pages/Workouts'
import Goals from './pages/Goals'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <Router>
      {token && <Navbar user={user} logout={logout} />}
      <Routes>
        <Route path="/login" element={!token ? <Login setToken={setToken} setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <Register setToken={setToken} setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/workouts" element={token ? <Workouts /> : <Navigate to="/login" />} />
        <Route path="/goals" element={token ? <Goals /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App

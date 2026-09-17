import { Link } from 'react-router-dom'

function Navbar({ user, logout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h1 style={styles.logo}>Fitness Tracker</h1>
        <div style={styles.links}>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/workouts" style={styles.link}>Workouts</Link>
          <Link to="/goals" style={styles.link}>Goals</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: '#4CAF50',
    padding: '15px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    fontSize: '24px',
    margin: 0
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#fff',
    color: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  }
}

export default Navbar

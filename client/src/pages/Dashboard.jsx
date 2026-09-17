import { useState, useEffect } from 'react'
import { workoutAPI, goalAPI } from '../services/api'

function Dashboard({ user }) {
  const [workouts, setWorkouts] = useState([])
  const [goals, setGoals] = useState([])
  const [stats, setStats] = useState({ totalWorkouts: 0, totalCalories: 0, totalDuration: 0 })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [workoutsRes, goalsRes] = await Promise.all([
        workoutAPI.getAll(),
        goalAPI.getAll()
      ])
      setWorkouts(workoutsRes.data)
      setGoals(goalsRes.data)

      const totalWorkouts = workoutsRes.data.length
      const totalCalories = workoutsRes.data.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0)
      const totalDuration = workoutsRes.data.reduce((sum, w) => sum + (w.duration || 0), 0)
      setStats({ totalWorkouts, totalCalories, totalDuration })
    } catch (err) {
      console.error('Error fetching data:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, {user?.name}!</h1>
      
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>Total Workouts</h3>
          <p style={styles.statNumber}>{stats.totalWorkouts}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Calories Burned</h3>
          <p style={styles.statNumber}>{stats.totalCalories}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Duration (min)</h3>
          <p style={styles.statNumber}>{stats.totalDuration}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Workouts</h2>
        {workouts.length === 0 ? (
          <p>No workouts yet. Start tracking!</p>
        ) : (
          <div style={styles.list}>
            {workouts.slice(0, 5).map(workout => (
              <div key={workout._id} style={styles.item}>
                <h4>{workout.name}</h4>
                <p>Type: {workout.type} | Duration: {workout.duration} min | Calories: {workout.caloriesBurned}</p>
                <p style={styles.date}>{new Date(workout.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Your Goals</h2>
        {goals.length === 0 ? (
          <p>No goals set yet.</p>
        ) : (
          <div style={styles.list}>
            {goals.map(goal => (
              <div key={goal._id} style={styles.item}>
                <h4>{goal.type} - {goal.period}</h4>
                <p>Progress: {goal.current} / {goal.target}</p>
                <p style={goal.achieved ? styles.achieved : styles.notAchieved}>
                  {goal.achieved ? '✓ Achieved' : 'In Progress'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    marginBottom: '30px',
    color: '#333'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#4CAF50',
    margin: '10px 0'
  },
  section: {
    marginBottom: '40px'
  },
  sectionTitle: {
    marginBottom: '20px',
    color: '#333'
  },
  list: {
    display: 'grid',
    gap: '15px'
  },
  item: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  date: {
    color: '#666',
    fontSize: '14px',
    marginTop: '5px'
  },
  achieved: {
    color: '#4CAF50',
    fontWeight: 'bold'
  },
  notAchieved: {
    color: '#ff9800'
  }
}

export default Dashboard

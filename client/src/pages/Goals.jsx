import { useState, useEffect } from 'react'
import { goalAPI } from '../services/api'

function Goals() {
  const [goals, setGoals] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [formData, setFormData] = useState({
    type: 'calories',
    target: '',
    period: 'daily'
  })

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await goalAPI.getAll()
      setGoals(response.data)
    } catch (err) {
      console.error('Error fetching goals:', err)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingGoal) {
        await goalAPI.update(editingGoal._id, formData)
      } else {
        await goalAPI.create(formData)
      }
      fetchGoals()
      setShowForm(false)
      setEditingGoal(null)
      setFormData({
        type: 'calories',
        target: '',
        period: 'daily'
      })
    } catch (err) {
      console.error('Error saving goal:', err)
    }
  }

  const handleEdit = (goal) => {
    setEditingGoal(goal)
    setFormData({
      type: goal.type,
      target: goal.target,
      period: goal.period
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await goalAPI.delete(id)
        fetchGoals()
      } catch (err) {
        console.error('Error deleting goal:', err)
      }
    }
  }

  const handleUpdateProgress = async (goal, increment) => {
    const newCurrent = Math.max(0, goal.current + increment)
    try {
      await goalAPI.updateProgress(goal._id, { current: newCurrent, target: goal.target })
      fetchGoals()
    } catch (err) {
      console.error('Error updating progress:', err)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Goals</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingGoal(null); setFormData({ type: 'calories', target: '', period: 'daily' }) }} style={styles.button}>
          {showForm ? 'Cancel' : 'Add Goal'}
        </button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h3>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Goal Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="calories">Calories Burned</option>
                <option value="duration">Duration (minutes)</option>
                <option value="workouts">Number of Workouts</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label>Target</label>
              <input
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Period</label>
              <select name="period" value={formData.period} onChange={handleChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <button type="submit" style={styles.submitButton}>
              {editingGoal ? 'Update' : 'Add'} Goal
            </button>
          </form>
        </div>
      )}

      <div style={styles.goalList}>
        {goals.length === 0 ? (
          <p style={styles.emptyMessage}>No goals set yet.</p>
        ) : (
          goals.map(goal => (
            <div key={goal._id} style={styles.goalCard}>
              <h3>{goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} - {goal.period.charAt(0).toUpperCase() + goal.period.slice(1)}</h3>
              <div style={styles.progressBar}>
                <div style={{
                  ...styles.progressFill,
                  width: `${Math.min(100, (goal.current / goal.target) * 100)}%`,
                  backgroundColor: goal.achieved ? '#4CAF50' : '#2196F3'
                }} />
              </div>
              <p style={styles.progressText}>{goal.current} / {goal.target}</p>
              <p style={goal.achieved ? styles.achieved : styles.notAchieved}>
                {goal.achieved ? '✓ Goal Achieved!' : 'In Progress'}
              </p>
              <div style={styles.actions}>
                <button onClick={() => handleUpdateProgress(goal, 1)} style={styles.progressButton}>+1</button>
                <button onClick={() => handleUpdateProgress(goal, -1)} style={styles.progressButton}>-1</button>
                <button onClick={() => handleEdit(goal)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(goal._id)} style={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    margin: 0,
    color: '#333'
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  formCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  goalList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  goalCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  progressBar: {
    height: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '15px 0'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  progressText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  achieved: {
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '15px'
  },
  notAchieved: {
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: '15px'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  progressButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    fontSize: '18px'
  }
}

export default Goals

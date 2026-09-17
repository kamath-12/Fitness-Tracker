import { useState, useEffect } from 'react'
import { workoutAPI } from '../services/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'cardio',
    duration: '',
    caloriesBurned: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = async () => {
    try {
      const response = await workoutAPI.getAll()
      setWorkouts(response.data)
    } catch (err) {
      console.error('Error fetching workouts:', err)
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
      if (editingWorkout) {
        await workoutAPI.update(editingWorkout._id, formData)
      } else {
        await workoutAPI.create(formData)
      }
      fetchWorkouts()
      setShowForm(false)
      setEditingWorkout(null)
      setFormData({
        name: '',
        type: 'cardio',
        duration: '',
        caloriesBurned: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      })
    } catch (err) {
      console.error('Error saving workout:', err)
    }
  }

  const handleEdit = (workout) => {
    setEditingWorkout(workout)
    setFormData({
      name: workout.name,
      type: workout.type,
      duration: workout.duration,
      caloriesBurned: workout.caloriesBurned,
      date: new Date(workout.date).toISOString().split('T')[0],
      notes: workout.notes
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workoutAPI.delete(id)
        fetchWorkouts()
      } catch (err) {
        console.error('Error deleting workout:', err)
      }
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Workouts</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingWorkout(null); setFormData({ name: '', type: 'cardio', duration: '', caloriesBurned: '', date: new Date().toISOString().split('T')[0], notes: '' }) }} style={styles.button}>
          {showForm ? 'Cancel' : 'Add Workout'}
        </button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h3>{editingWorkout ? 'Edit Workout' : 'Add New Workout'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Workout Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="flexibility">Flexibility</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Calories Burned</label>
              <input
                type="number"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Notes (optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              {editingWorkout ? 'Update' : 'Add'} Workout
            </button>
          </form>
        </div>
      )}

      <div style={styles.workoutList}>
        {workouts.length === 0 ? (
          <p style={styles.emptyMessage}>No workouts recorded yet.</p>
        ) : (
          workouts.map(workout => (
            <div key={workout._id} style={styles.workoutCard}>
              <h3>{workout.name}</h3>
              <p><strong>Type:</strong> {workout.type}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Calories:</strong> {workout.caloriesBurned || 0}</p>
              <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
              {workout.notes && <p><strong>Notes:</strong> {workout.notes}</p>}
              <div style={styles.actions}>
                <button onClick={() => handleEdit(workout)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(workout._id)} style={styles.deleteButton}>Delete</button>
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
  workoutList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  workoutCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
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

export default Workouts

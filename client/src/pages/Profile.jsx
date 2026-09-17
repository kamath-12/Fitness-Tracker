import { useState } from 'react'
import { authAPI } from '../services/api'

function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || ''
  })
  const [message, setMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authAPI.updateProfile(formData)
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      setMessage('Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Error updating profile')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Profile</h2>
        {message && <p style={message.includes('success') ? styles.success : styles.error}>{message}</p>}
        
        {!isEditing ? (
          <div style={styles.info}>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Age:</strong> {user?.age || 'Not set'}</p>
            <p><strong>Height:</strong> {user?.height ? `${user.height} cm` : 'Not set'}</p>
            <p><strong>Weight:</strong> {user?.weight ? `${user.weight} kg` : 'Not set'}</p>
            <button onClick={() => setIsEditing(true)} style={styles.button}>Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <button type="submit" style={styles.button}>Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    marginBottom: '30px',
    color: '#333'
  },
  info: {
    lineHeight: '2'
  },
  formGroup: {
    marginBottom: '20px'
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginRight: '10px'
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  success: {
    color: '#4CAF50',
    marginBottom: '20px'
  },
  error: {
    color: '#f44336',
    marginBottom: '20px'
  }
}

export default Profile

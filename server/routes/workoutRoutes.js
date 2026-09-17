const express = require('express');
const router = express.Router();
const { createWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/', createWorkout);
router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;

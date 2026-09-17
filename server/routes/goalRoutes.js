const express = require('express');
const router = express.Router();
const { createGoal, getGoals, getGoalById, updateGoal, deleteGoal, updateGoalProgress } = require('../controllers/goalController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:id', getGoalById);
router.put('/:id', updateGoal);
router.put('/:id/progress', updateGoalProgress);
router.delete('/:id', deleteGoal);

module.exports = router;

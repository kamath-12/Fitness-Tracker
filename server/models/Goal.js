const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['calories', 'duration', 'workouts']
  },
  target: {
    type: Number,
    required: true
  },
  current: {
    type: Number,
    default: 0
  },
  period: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly']
  },
  achieved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

goalSchema.index({ userId: 1, period: 1 });

module.exports = mongoose.model('Goal', goalSchema);

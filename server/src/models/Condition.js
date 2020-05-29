import mongoose from 'mongoose';

const conditionSchema = new mongoose.Schema({
  condition_id: String,
  name: String,
  probability: Number,
  timestamp: String,
});

const Condition = mongoose.model('Condition', conditionSchema);

export default Condition;

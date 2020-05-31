import mongoose from 'mongoose';

const { Schema } = mongoose;
const historySchema = new Schema({
  email: String,
  conditions: [String],
  date: String,
});

const History = mongoose.model('History', historySchema);

export default History;

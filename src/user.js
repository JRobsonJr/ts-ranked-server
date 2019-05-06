import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserCountSchema = new Schema({ id: String, total: Number });

export default mongoose.model('User', UserCountSchema);
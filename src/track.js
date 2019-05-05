import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TrackSchema = new Schema({ id: String, scores: [Number], total: Number, voters: Number });

export default mongoose.model('Track', TrackSchema);
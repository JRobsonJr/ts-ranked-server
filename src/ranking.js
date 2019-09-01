import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RankingSchema = new Schema(
    { tracks: [String], dateSent: { type: Date, default: Date.now }, scope: String }
);

export default mongoose.model('Ranking', RankingSchema);
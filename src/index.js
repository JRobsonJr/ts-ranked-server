import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Track from './track';
import User from './user';

import 'dotenv/config';

const API_PORT = 5000;
const app = express();
app.use(cors());
const router = express.Router();

console.log(process.env.DB_LOGIN);

const dbRoute = `mongodb://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@ds151486.mlab.com:51486/ts-ranker`;

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('Connected to the DB!'));
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/tracks', (req, res) => {
    Track.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        else return res.json({ success: true, data: data });
    });
});

router.put('/tracks', (req, res) => {
    const { id, score } = req.body;
    Track.findOneAndUpdate({ id: id }, { $push: { 'scores': score }, $inc: { 'total': score, 'voters': 1 } }, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.put('/users', (req, res) => {
    User.findOneAndUpdate({ }, { $inc: { 'total': 1 } }, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/tracks', (req, res) => {
    const { id } = req.body;
    if (!id) return res.json({
        success: false,
        error: 'Id cannot be empty',
    });

    const track = new Track({ id, scores: [], total: 0, voters: 0 });

    track.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}...`));

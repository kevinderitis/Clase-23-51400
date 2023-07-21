import express from 'express';
import SessionRouter from './src/routes/session.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const sessionRouter = new SessionRouter();

app.use('/api/session', sessionRouter.getRouter())

const server = app.listen(8080, () => console.log('server running'));
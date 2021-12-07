import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import apiRoutes from './routes/v1';

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors() as any);

app.use(express.static('public'));

// v1 api routes
app.use('/v1', apiRoutes);

export default app;

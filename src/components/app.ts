import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import router from '../routes';
import getRootFolder from '../functions/getRootFolder';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(getRootFolder(), 'public')));

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(_req, res) {
  res.status(404);

  res.type('txt').send('Not found');
});

export default app;

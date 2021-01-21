import express from 'express';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

import hiraganaRoutes from './routes/hiragana.js';
import katakanaRoutes from './routes/katakana.js';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', hiraganaRoutes);
app.use('/api', katakanaRoutes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  err.message = err.message || 'Error';
  err.status = err.status || 400;

  return res.status(err.status).json({
    message: err.message
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


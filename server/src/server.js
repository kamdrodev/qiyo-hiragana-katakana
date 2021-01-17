import express from 'express';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

import hiragana from './db/hiragana.json';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.get("/hello", (req, res) => {
//   return res.json({message: "Hello World"});
// });

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  err.message = err.message || 'Error';
  err.status = err.status || 400;

  return res.status(err.status).json({
    message: err.message
  });
});

// const port = process.env.PORT || 8000;i

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });


import express from 'express';
import db from './helpers/connectDB';
import morgan from 'morgan';
import bodyParser from 'body-parser';
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
db.connect(
  'mongodb://localhost:27017/MongoDB-Tut',
  function(err, db) {
    if (err) throw err;
    app.listen(4000, () => {
      console.log('app running on port 4000');
    });
  }
);
app.get('/admin/:id', function(req, res) {
  const myAwesomeDB = db.get().db('MongoDB-Tut');
  myAwesomeDB
    .collection('user')
    .find()
    .toArray(function(err, result) {
      if (err) throw err;

      res.json(result);
    });
});

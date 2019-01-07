
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine', 'pug');

const routes = require('./routes');
app.use(routes);

// app.use((req, res, next) => {
//   console.log("Hello")
//   const err = new Error('SHIT!');
//   err.status = 500;
//   next();
// });

// app.use((req, res, next) => {
//   console.log("world");
//   next();
// });

app.use((req, res, next) => {
  const err = new Error("Not Found, Bitches");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!')
});
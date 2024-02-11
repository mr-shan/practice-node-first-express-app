const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// sample middleware
// app.use((req, res, next) => {
//   console.log(`Incomming request: ${req.url}`);
//   next();
// })

app.use(productRoutes)

app.get('', (req, res, next) => {
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.render('home', { pageTitle: 'Shop Mart - Home', path: '/' })
})

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  res.status(404).render('404', { pageTitle: '404! Not Found.', path: req.path })
})

app.listen(3000, () => {
  console.log('Express server running at 3000');
})
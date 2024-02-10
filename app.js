const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`Incomming request: ${req.url}`);
  next();
})

app.use(productRoutes)

app.get('', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000, () => {
  console.log('Express server running at 3000');
})
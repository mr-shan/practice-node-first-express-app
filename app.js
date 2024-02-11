const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');
const appRoutes = require('./routes/appRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// routes
app.use(productRoutes)
app.use(appRoutes);


app.listen(3000, () => {
  console.log('Express server running at 3000');
})
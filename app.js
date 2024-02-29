// note modules imports
const path = require('path');

// express imports
const express = require('express');
const bodyParser = require('body-parser');

// db imports
const sequelize = require('./tools/database');

const setRelationShips = require('./tools/relationships');
const assignUserToRequest = require('./middlewares/user');
const User = require('./models/User');

// route imports
const productRoutes = require('./routes/productRoutes');
const appRoutes = require('./routes/appRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(assignUserToRequest);

app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// routes
app.use(productRoutes);
app.use('/admin', adminRoutes);
app.use(cartRoutes);
app.use(appRoutes);

// this sets up the relationships between models.
setRelationShips();

sequelize
  .sync()
  .then((response) => {
    console.log('MySQL connection successful.');
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user)
      return User.create({
        first_name: 'Shantanu',
        last_name: 'Kulkarni',
        email: 'test@test.com',
      });
    return Promise.resolve(user);
  })
  .then((user) => {
    app.listen(3000, () => {
      console.log('Express server running at 3000');
    });
  })
  .catch((error) => {
    console.log('MySQL connection error.');
    console.error(error);
  });

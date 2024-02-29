const User = require('./../models/User');

const assignUserToRequest = async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    req.user = user;
  } catch (error) {
    console.error(error);
    req.user = null;
  }
  console.log("Inside user middleware")
  next();
}

module.exports = assignUserToRequest;
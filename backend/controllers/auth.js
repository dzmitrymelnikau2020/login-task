const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');

// @desc Login user
// @route POST api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    // Validate email & password
    if (!username || !password) {
        return next(new ErrorResponse(`Please provide email & password`, 400));
    }
  const db = path.join(__dirname, '../db/users.json');
    // Check for user
  await fs.readFile(db, 'utf8',  (err, data) => {
      if (err) {
        return next(new ErrorResponse(err.message, err.statusCode));
      }
      const user = JSON.parse(data).find((u => u.email === username && u.password === password))
      if (!user) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
      }
      user.getSignedJwtToken = function () {
        return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE
        });
      }
      sendTokenResponse(user, 200, res);
    });
});


// Get token & send res
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    res
        .status(statusCode)
        .json({...user, token})
};

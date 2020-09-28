const fs = require('fs');
const path = require('path');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Update user
// @route   POST api/v1/courses/:id
// @access  Private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = req.body;

  const db = path.join(__dirname, '../db/users.json');
  await fs.readFile(db, 'utf8', (err, data) => {
    if (err) {
      return next(new ErrorResponse(err.message, err.statusCode));
    }

    const userList = JSON.parse(data);
    const newUserList = userList.map(item =>
      item.id === user.id ? user : item );
    fs.writeFile(db, JSON.stringify(newUserList), (err) => {
      if (err) {
        return next(new ErrorResponse(err.message, err.statusCode));
      }
      console.log('complete');
    });
    res.status(200).json(user)
  });
});

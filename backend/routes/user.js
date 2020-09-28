const express = require('express');
const router = express.Router();

const { updateUser } = require('../controllers/user');

router
  .route('/update')
  .post(updateUser)

module.exports = router;

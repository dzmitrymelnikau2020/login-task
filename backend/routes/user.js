const express = require('express');
const router = express.Router();

const { updateUser, getUser } = require('../controllers/user');

router
  .route('/:id')
    .get(getUser)
router
  .route('/update')
    .post(updateUser)

module.exports = router;

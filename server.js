const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const debug = require('debug')('node-angular')
const colors = require('colors');
//const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./backend/middleware/error');
const disableCors = require('./backend/middleware/cors');
const noCache = require('./backend/middleware/no-cache');

dotenv.config({ path: './backend/config/config.env' });

const auth = require('./backend/routes/auth');
const user = require('./backend/routes/user');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Cors disable
app.use(disableCors);

app.use(noCache);

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
//app.use(fileUpload());

// Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port `.yellow.bold, PORT)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

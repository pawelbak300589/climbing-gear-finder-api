const express = require('express');
const cors = require('cors');
const errorHandler = require('./_middleware/error-handler');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// api routes
app.use('/auth', require('./auth/auth.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});
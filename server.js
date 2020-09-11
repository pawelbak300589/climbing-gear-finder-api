require('dotenv').config();

const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/error-handler');
const sequelize = require('./utils/database');

const Associations = require('./models/associations')();
const Brand = require("./models/brand");

const app = express();

app.use(express.json());
app.use(cors());

// api routes
// app.use('/auth', require('./controllers/auth'));
app.use('/scrape', require('./controllers/scrape'));
app.use('/brands', require('./controllers/brands'));
app.use('/brands/:brandId/mappings', require('./controllers/brand-name-mappings'));

// global error handler
app.use(errorHandler);

// start server
sequelize
    .sync({ force: true })
    // .sync()
    .then(result => {
        const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
        app.listen(port, () => {
            console.log('Server running on port ' + port);
        });
    })
    .catch(err => console.log(err));
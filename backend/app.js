const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();

//Routes
const index = require('./api/routes/index');
const users = require('./api/routes/users');
const tasks = require('./api/routes/tasks');

// Port settings
const port = process.env.PORT || 1337;

// Cors
app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// parsing incoming requests
app.use(express.json());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Middleware for all routes
app.use((req, res, next) => {
    // console.log(req.method);
    // console.log(req.path);
    next();
});

app.use("/public", express.static('public'));

// Add routes
app.use('/', index);
app.use('/users', users);
app.use('/tasks', tasks);

// set view engine for testing Oauth / manual for API?
app.set('view engine', 'ejs');

// Connect Mongoose
let dsn;

// test db
if (process.env.NODE_ENV === 'test') {
    dsn = "mongodb://127.0.0.1:27017/dbtest";
} else {
    // MongoDB Atlas
    dsn = `mongodb+srv://task-scheduler:${process.env.DB_PW}` +
    `@cluster1.h4d9bh0.mongodb.net/${process.env.DB_NAME}` +
    `?retryWrites=true&w=majority`;
}

mongoose.connect(
    dsn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
// Start up server
    .then(() => {
        app.listen(port, () => {
            console.log(`Task Scheduler API listening on port ${port}!`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Routes for 404 and error handling
app.use((req, res, next) => {
    const err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

exports.app = app;

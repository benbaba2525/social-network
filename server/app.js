const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const config = require('./config/config');
//Connect to DB
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true })
.then(()=> console.log('DB Connected!!'))
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
});

//import from routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');



//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

app.use("/", postRoutes);
app.use("/", authRoutes);

const port = 8080

app.listen(port, () => {
    console.log(`Server is 🌏 listening on port : ${port}`
)});
const express = require('express');
const app = express();
const morgan = require('morgan')

//import from routes
const postRoutes = require('./routes/post');



//Middleware
app.use(morgan('dev'));

app.use("/", postRoutes);

const port = 8080

app.listen(port, () => {
    console.log(`Server is 🌏 listening on port : ${port}`
)});
const express = require('express')
const app = express()

app.get("/", (req, res) =>{
    res.send("Hello social app server")
});

const port = 8080

app.listen(port, () => {
    console.log(`Server is 🌏 listening on port : ${port}`
)})
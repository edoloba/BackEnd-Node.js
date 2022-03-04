const express = require('express');
require('dotenv').config();
const path = require('path')

const app = express();
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 4000


// to call index.htm
// app.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })
// or
// it will respond to all the request made with GET method
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})



app.listen(port, () => {
    console.log(`Server on port ${port}`);
})
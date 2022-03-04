// require express
const express = require('express');
require('dotenv').config();
// package for handle path => line 14: no need / before the path. Use path.join(). Useful because it works globally the same for every OS. (in windows path start with \ and not /)
const path = require('path');

const app = express();
// try to get port from .env file, if not we set it to 3000
const port = process.env.PORT || 3000

// create public middleware
app.use(express.static(__dirname +'/public'))
// using 'path' package
// app.use(express.static(path.join(__dirname, 'public')))


// create home route
app.get('/', (req, res) => {
    // res.send('Hello FBW E05-1');
    // res.sendFile(__dirname + '/views/index.html')


    // with 'path package
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/contactus', (req, res) => {
    console.log(req);
    res.send('<h1>This is the contact page</h1>')
})
// task: 
// create route /about and send the file /views/about.html
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
});
app.get('/menu', (req, res) => {
    res.sendFile(__dirname + '/views/menu.html')
})
app.get('/reservation', (req, res) => {
    res.sendFile(__dirname + '/views/reservation.html')
})
app.get('/special-dishes', (req, res) => {
    res.sendFile(__dirname + '/views/special-dishes.html')
})
app.get('/team', (req, res) => {
    res.sendFile(__dirname + '/views/team.html')
})
// task 2:
// download some free html template and try to build back end routes:



// make app listen to port 3000
app.listen(port, () => {
    console.log(`node application is listening to port ${port}`);
})
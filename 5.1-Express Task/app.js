const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.static(__dirname +'/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
});
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html')
})
app.get('/studio', (req, res) => {
    res.sendFile(__dirname + '/views/studio.html')
})
app.get('/works', (req, res) => {
    res.sendFile(__dirname + '/views/works.html')
})
app.listen(port, () => {
    console.log(`Running port: ${port}`);
})
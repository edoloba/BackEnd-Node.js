// to create server in nodejs e use 'http library' (already installed in nodejs)
const http = require("http");
const fs = require("fs");

// method to create server. It takes a callback function with 2 arguments: REQUEST & RESPONSE.
const server = http.createServer((req, res) => {
  //    console.log(req.headers);
//   console.log(req.url);

  //    store req.header in file
  fs.writeFile("req.json", JSON.stringify(req.headers), (error) => {
    if (error) throw error;
    //    console.log('header saved')
  });
  res.writeHead(200, { "content-Type": "text/html" });
  //    res.end('<h1>Welcome from nodejs Server</h1>')
  if (req.url === "/") {
    fs.readFile("index.html", (error, data) => {
      if (error) throw error;
      res.end(data.toString());
    });
  } else if(req.url === '/home') {
//    redirect to /home
res.writeHead(301, {"Location": "/"}).end()
  } 
   else {
      res.writeHead(404, {"content-type": "text/html"})
      res.end("<h3>No result found</h3>")
  }
  //    can also render js (<script>alert('Hi')</script>)
});

// we need to assign a port to the server
server.listen(3000, () => {
  console.log(`The server is running on port 3000!`);
});
// sudo apt install npm
// to install nodemon global
// sudo npm i -g nodemon

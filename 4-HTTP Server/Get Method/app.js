// start
const http = require("http");
const fs = require("fs");
const url = require("url");
const { isBooleanObject } = require("util/types");

// getting template
let template = ``;
fs.readFile("./index.html", (error, data) => {
  if (error) throw error;
  template = data.toString();
});

const server = http
  .createServer((req, res) => {
    // getting all products
    // for any request we send all products
    // console.log(url.parse(req.url, true));
    // this change the url
    const params = url.parse(req.url, true).query;
    if (params.id) {
      // asking for some product
      fs.readFile("./products.json", (error, data) => {
        if (error) {
          res
            .writeHead(200, { "content-type": "text/html" })
            .end("<h1>Internal Server Error!</h1>");
        } else {
          const products = JSON.parse(data.toString());
          const product = products.find((item) => item.id == params.id);
          //   console.log(product)
          let content = `<div class="products"><h1>${product.brand}</h1>
                            <ul>
                                <li>model: ${product.model}</li>
                                <li>power: ${product.power} </li>
                                <li>gear: ${product.gear}</li>
                                <li>fuel: ${product.fuel}</li>
                                <li>prise: ${product.prise}</li>
                                <li>doors: ${product.doors}</li>
                            </ul></div>
                            <a href="/">Go To all products</a>
                    `;
          res.writeHead(200, { "content-type": "text/html" });
          res.end(
            template.replace("{{}}", content).replace("[[]]", product.brand)
          );
        }
      });
    } else if (params.doors) {
      // return to client all cars which have doors matching
      fs.readFile("./products.json", (error, data) => {
        if (error) {
          res
            .writeHead(200, { "content-type": "text/html" })
            .end("<h1>Internal server Error!</h1>");
        } else {
          const products = JSON.parse(data.toString());
          const product = products.filter((p) => p.doors == params.doors);
          //  console.log(product)
          let container = `<div class="container">`;
          if (product.length > 0) {
            product.forEach((pro) => {
              container += `<div class="products"><h2>${pro.brand}</h2> <p>Prise: ${pro.prise}</p><a href="/?id=${pro.id}">Read more</a></div>`;
            });
            container += `</div><a href="/">Go to all products</a>`;
            res.writeHead(200, { "content-type": "text/html" });
            res.end(
              template
                .replace("{{}}", container)
                .replace("[[]]", `All Products || ${params.doors}`)
            );
          } else {
            res
              .writeHead(200, { "content-type": "text/html" })
              .end("<h1>No products found!</h1>");
          }
        }
      });
    } else if (params.brand) {
      // store the new incoming request params in products.json,
      // you must auto increase the ID!!
      // 1.get products
      // 2.create an bj of products (increase ID)
      // 3.push to products the new object
      // 4.save te products into the same file
      const obj = params;
      
      obj.doors = params.door;
      fs.readFile("./products.json", (err, data) => {
          if (err) {
              res
              .writeHead(200, { "content-type": "text/html" })
              .end("<h2>Internal server error</h2>");
            } else {
              const products = JSON.parse(data.toString());
              obj.id = products[products.length -1].id+1;
              products.push(obj)
              fs.writeFile('./products.json', JSON.stringify(products), error=>{
                  if(error) {
                    res
                    .writeHead(200, { "content-type": "text/html" })
                    .end("<h1>Internal server Error!</h1>");
                  } else {
                      res.writeHead(301, {"Location" : "/"}).end();

                  }
              })
            
            }
        })
            
// (function save(obj) {
    
//     const jsonText = fs.readFileSync('users.json', 'utf8');
//     let arr;

//     if (jsonText.trim() === '') {
//         arr = [];
//     } else {

//         arr = JSON.parse(jsonText);
//     }
//     obj
//     // add the obj to arr
//     arr.push(obj);
    
//     fs.writeFileSync('users.json', JSON.stringify(arr));
//     return arr;
// })
        
    
    } else {
      fs.readFile("./products.json", (error, data) => {
        if (error) {
          res
            .writeHead(200, { "content-type": "text/html" })
            .end("<h2>Internal server error</h2>");
          console.log(error);
        } else {
          let container = `<div class="container">`;
          let products = JSON.parse(data.toString());
          // console.log(products)
          // loop for each product inside to generate a div for each item
          products.forEach((product) => {
            container += `<div class="products ${
              product.power >= 200 ? "background" : "back-green"
            }"><h2>${product.brand}</h2> <p>Prise: ${
              product.prise
            }</p><a href="/?id=${product.id}">Read more</a></div>`;
          });
          //   form to search in base of door and render a new url with the params
          container += `</div><hr>
          <form action="/" method="GET">
          <input type="text" placeholder="Doors" name="doors"/>
          <br/>
          <input type="submit" value="Search"/>
          </form>
          <hr/>
          <form action="/" method="GET">
          <input type="text" placeholder="brand" name="brand"/><br/>
          <input type="text" placeholder="model" name="model"/><br/>
          <input type="text" placeholder="power" name="power"/><br/>
          <input type="text" placeholder="gear" name="gear"/><br/>
          <input type="text" placeholder="fuel" name="fuel"/><br/>
          <input type="text" placeholder="prise" name="prise"/><br/>
          <input type="text" placeholder="doors" name="door"/><br/>
          <input type="submit" value="Insert"/>
          </form>`;
          res.writeHead(200, { "content-type": "text/html" });
          res.end(
            template.replace("{{}}", container).replace("[[]]", "All Products")
          );
        }
      });
    }
  })
  .listen(3000, () => console.log("The server is running on port 3000."));

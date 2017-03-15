const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// allow parsing json and url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load static files
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/node_modules`));

// set up port for server to linsten on
const port = process.env.PORT || 3000;

const inputJson = {
  "Images": [
    {
      "name":"Apple",
      "path":"https://staticdelivery.nexusmods.com/mods/110/images/74627-0-1459502036.jpg"
    },
    {
      "name":"Orange",
      "path":"http://bangalorefruits.com/wp-content/uploads/2013/07/orange-02.jpg"
    },
    {
      "name":"Mango",
      "path":"http://mangomaniafl.net/wp-content/uploads/2014/06/iStock_000012591574Medium.jpg"
    }
  ]
}

const images = inputJson.Images;

app.get('/getAll', function(req, res) {
  res.send(200, images);
});

app.post('/addImage', function(req, res) {
  images.push(req.body);
  res.send(200, req.body);
});

// Fire up server
app.listen(port);

// print friendly message to console
console.log("Server is listening on port " + port);

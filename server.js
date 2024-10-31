const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  const num = _.random(0, 20);
  console.log(num);

  res.setHeader('Content-Type', 'text/html');

  let path;
  switch (req.url) {
    case '/':
      path = './views/index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path = './views/about.html';
      res.statusCode = 200;
      break;
    case '/about-blah':
      //console.log('Redirecting /about-blah to /about');
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      //return; // Stop further processing
    default:
      path = './views/404.html';
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('Listening for requests on port 3000');
});

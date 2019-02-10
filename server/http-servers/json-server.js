import http from 'http';
import path from 'path';
import fs from 'fs';

const server = http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
    if (err) {
      console.log(err);

    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(data);
    }
  });
});

server.listen(1337, err => {
  if (err) {
    console.log(`Error: ${err}`);
  }
});
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  res.end('Some string')
});

server.listen(1337, err => {
  if (err) {
    console.log(`Error: ${err}`);
  }
});
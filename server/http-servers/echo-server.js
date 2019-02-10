import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200);
  req.pipe(res);
});

server.listen(1337, err => {
  if (err) {
    console.log(`Error: ${err}`);
  }
});

import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import hbs from 'hbs';
import readline from 'readline';

const server = http.createServer((req, res) => {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'data', 'index.html')),
  });
  const q = url.parse(req.url, true).query;
  const context = { message: q.message || 'Some string' };

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  lineReader
    .on('line', line => {
      const template = hbs.compile(line);

      res.write(template(context));
    })
    .on('close', () => {
      res.end();
    })
});

server.listen(1337, err => {
  if (err) {
    console.log(`Error: ${err}`);
  }
});

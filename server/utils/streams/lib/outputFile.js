import fs from 'fs';

const handleError = e => console.log(e);

export const outputFile = filePath => {

  if (filePath) {
    fs.stat(filePath, (err, stat) => {

      if (err) {
        console.log('File does not exists');

      } else {

        if (stat.isFile()) {
          const stream = fs.createReadStream(filePath);

          stream
            .on('error', handleError)
            .pipe(process.stdout)
            .on('error', handleError);

        } else {
          console.log('Current path is directory');
        }
      }
    })

  } else {
    console.log('There is no path');
  }
};

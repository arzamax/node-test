import fs from 'fs';
import path from 'path';

export const getCSVConverterWrapper = (stream, filePath) => {

  if (filePath) {
    fs.stat(filePath, (err, stat) => {

      if (err) {
        console.log('File does not exist');

      } else {

        if (stat.isFile()) {

          if (path.extname(filePath) === '.csv') {
            stream();

          } else {
            console.log('Select .csv file');
          }

        } else {
          console.log('Current path is directory');
        }
      }
    })

  } else {
    console.log('There is no path');
  }
};

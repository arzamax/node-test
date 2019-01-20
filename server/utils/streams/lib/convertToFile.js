import fs from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';

import { getCSVConverterWrapper } from './helpers/getCSVConverterWrapper';

const handleError = e => console.log(e);

const createStream = (filePath) => () => {
  const stream = fs.createReadStream(filePath);

  stream
    .on('error', handleError)
    .pipe(csvtojson())
    .on('error', handleError)
    .pipe(fs.createWriteStream(
      path.join(path.dirname(filePath),
      path.basename(filePath).split('.')[0]) + '.json')
    )
    .on('error', handleError)
};

export const convertToFile = filePath => {
  const stream = createStream(filePath);


  getCSVConverterWrapper(stream, filePath);
};

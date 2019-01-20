import fs from 'fs';
import csvtojson from 'csvtojson';

import { getCSVConverterWrapper } from './helpers/getCSVConverterWrapper';

const handleError = e => console.log(e);

const createStream = (filePath) => () => {
  const stream = fs.createReadStream(filePath);

  stream
    .on('error', handleError)
    .pipe(csvtojson())
    .on('error', handleError)
    .pipe(process.stdout)
    .on('error', handleError);
};

export const convertFromFile = filePath => {
  const stream = createStream(filePath);

  getCSVConverterWrapper(stream, filePath);
};

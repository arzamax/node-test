import through from 'through2';

const handleError = e => console.log(e);

export const reverse = () => {
  const stream = process.stdin;

  stream
    .on('error', handleError)
    .pipe(through((chunk, _, next) => {
      const ch = `${chunk.toString().split('').reverse().join('')}\n`;

      next(null, ch);
    }))
    .on('error', handleError)
    .pipe(process.stdout)
    .on('error', handleError)
};

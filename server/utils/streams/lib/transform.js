import through from 'through2';

const handleError = e => console.log(e);

export const transform = () => {
  const stream = process.stdin;

  stream
    .on('error', handleError)
    .pipe(through((chunk, _, next) => {
      const ch = chunk.toString().toUpperCase();

      next(null ,ch);
    }))
    .on('error', handleError)
    .pipe(process.stdout)
    .on('error', handleError);
};

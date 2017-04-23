export default (xx) => (err, req, res, next) => {
  console.error(xx)
  console.error('[1]', err);
  console.error('[2]', err.message);
  console.error('[3]', err.stack);

  res.status(500).send(`An error has occurred: ${err.message}`);
};


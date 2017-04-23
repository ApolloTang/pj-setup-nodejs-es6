export default () => (err, req, res, next) => {
  res.status(500).send(`An error has occurred: ${err.message}`);
};


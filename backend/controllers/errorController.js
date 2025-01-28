exports.get404 = (req, res, next) => {
  res.status(404).send("Page not found");
};

exports.get500 = (req, res, next) => {
  res.status(500).send("Internal server error");
};
exports.get401 = (req, res, next) => {
  res.status(401).send("Unauthorized");
};
exports.get403 = (req, res, next) => {
  res.status(403).send("Forbidden");
};

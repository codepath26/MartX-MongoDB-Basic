exports.get404 = (req, res, next) => {
  console.log("this is the error")
  res.status(404).json("page not found")
};

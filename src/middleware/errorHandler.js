const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Đã xảy ra lỗi không xác định.",
  });
};

module.exports = errorHandler;

const errorHandler = (err, req, res, next) => {
  console.error(err); // Ghi lại lỗi

  const statusCode = err.statusCode || 500; // Sử dụng mã trạng thái từ lỗi hoặc 500
  res.status(statusCode).json({
    status: "err",
    message: err.message || "An internal server error occurred",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Chỉ trả lại stack trace khi ở môi trường phát triển
  });
};

module.exports = errorHandler;

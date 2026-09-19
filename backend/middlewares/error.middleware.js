
 export const errorMiddleware = (err, req, res, next) => {
  // console.error(err); // For debugging

  // Default error structure
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    message: err.message || "Something went wrong",
    // stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // hide stack in production
    errorType: err.name || "ServerError",
  };

  res.status(statusCode).json(errorResponse);
};


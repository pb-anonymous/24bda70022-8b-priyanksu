import { StatusCodes } from "http-status-codes";
import logger from "../config/logger.js";

const errorMiddleware = (err, req, res, next) => {
  try {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";

    if (statusCode >= 500) {
      logger.error(`${req.method} ${req.originalUrl} - ${message}`, { stack: err.stack });
    } else {
      logger.warn(`${req.method} ${req.originalUrl} - ${message}`);
    }

    // Make sure we only send response if headers haven't been sent
    if (!res.headersSent) {
      res.status(statusCode).json({ success: false, message });
    }
  } catch (error) {
    logger.error(`Error in error middleware: ${error.message}`);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};

export default errorMiddleware;

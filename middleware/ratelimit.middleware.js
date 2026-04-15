import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10, // number of points
  duration: 60, // per 60 seconds
});

const rateLimit = (req, res, next) => {
  // Get IP safely - handle both direct IP and x-forwarded-for
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || "unknown";
  
  rateLimiter
    .consume(ip)
    .then(() => {
      next();
    })
    .catch((rejRes) => {
      res.status(429).json({
        success: false,
        message: "Too many requests, please try again later.",
      });
    })
    .catch((err) => {
      // Fallback if something goes wrong
      next();
    });
};

export default rateLimit;

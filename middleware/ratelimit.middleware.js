import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10, // number of points
  duration: 60, // per 60 seconds
});

const rateLimit = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  }
};

export default rateLimit;

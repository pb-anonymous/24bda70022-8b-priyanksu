import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 100, // Increase points for serverless
  duration: 60,
});

const rateLimit = (req, res, next) => {
  try {
    // Get IP safely - handle both direct IP and x-forwarded-for
    const ip = (req.headers["x-forwarded-for"] || req.ip || req.socket?.remoteAddress || "default").split(",")[0].trim();
    
    rateLimiter
      .consume(ip)
      .then(() => {
        next();
      })
      .catch(() => {
        // Rate limit exceeded, but don't crash - just pass through
        next();
      });
  } catch (err) {
    // If rate limiter has any issue, just continue
    next();
  }
};

export default rateLimit;

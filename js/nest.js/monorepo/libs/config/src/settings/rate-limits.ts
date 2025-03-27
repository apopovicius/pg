export const RateLimits = {
  global: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
  },
  auth: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 10,
  },
};

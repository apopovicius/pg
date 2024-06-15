class CacheManager {
  constructor() {
    this.cachedData = null; // Initialize cached data to null
    this.expiryTimer = null; // Timer for refreshing data before expiry
  }

  async fetchData() {
    // Simulate fetching data from an async API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Here, you would replace the URL with your actual API endpoint
        const data = { token: new Date(), expiryDate: 5000 };
        resolve(data);
      }, 2000); // Simulating a delay of 2 seconds
    });
  }

  async updateCache() {
    try {
      const data = await this.fetchData();
      this.cachedData = data;
      // Set a timer to refresh the cache just before the expiry date
      const timeUntilExpiry = this.cachedData.expiryDate - Date.now();
      if (timeUntilExpiry > 0) {
        this.expiryTimer = setTimeout(() => {
          this.updateCache();
        }, timeUntilExpiry);
      }
    } catch (error) {
      console.error("Error updating cache:", error);
    }
  }

  getCacheData() {
    // If cachedData is null or expired, update the cache
    if (!this.cachedData || this.cachedData.expiryDate < Date.now()) {
      this.updateCache();
    }
    return this.cachedData;
  }
}

// Example usage:
const cacheManager = new CacheManager();
// Retrieve data from cache synchronously
const data = cacheManager.getCacheData();

console.log("Data retrieved from cache:", data);

setTimeout(() => {
  console.log("[1s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);

setTimeout(() => {
  console.log("[2s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);

setTimeout(() => {
  console.log("[3s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);

setTimeout(() => {
  console.log("[4s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);

setTimeout(() => {
  console.log("[5s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);

setTimeout(() => {
  console.log("[6s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);

setTimeout(() => {
  console.log("[7s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);
setTimeout(() => {
  console.log("[8s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);
setTimeout(() => {
  console.log("[9s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);
setTimeout(() => {
  console.log("[10s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);

setTimeout(() => {
  console.log("[11s] Data retrieved from cache:", cacheManager.getCacheData());
}, 1000);

class RateLimiter {
    constructor() {
      this.requestsPerSecond = 20;
      this.requestsPerTwoMinutes = 100;
      this.requestQueue = [];
      this.interval = 1000 / this.requestsPerSecond; // Interval in milliseconds
      this.twoMinutesInterval = 2 * 60 * 1000; // Interval in milliseconds
      this.currentCount = 0;
      this.lastResetTime = Date.now();
      this.timer = null;
    }
  
    async enqueueRequest(request) {
      return new Promise((resolve, reject) => {
        this.requestQueue.push({ request, resolve, reject });
      });
    }
  
    async executeNextRequest() {
      if (this.requestQueue.length === 0) return;
  
      const { request, resolve, reject } = this.requestQueue.shift();
  
      try {
        const now = Date.now();
        if (now - this.lastResetTime >= this.twoMinutesInterval) {
          // Reset the count if two minutes have passed since the last reset
          this.currentCount = 0;
          this.lastResetTime = now;
        }
  
        if (this.currentCount >= this.requestsPerTwoMinutes) {
          // Rate limit exceeded, wait until the next reset
          const timeToWait = this.lastResetTime + this.twoMinutesInterval - now;
          await new Promise((resolve) => setTimeout(resolve, timeToWait));
        }
  
        this.currentCount++;
        const result = await request();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
  
    start() {
      this.timer = setInterval(() => this.executeNextRequest(), this.interval);
    }
  
    stop() {
      clearInterval(this.timer);
    }
  }
  
  // Usage example:
  
  // Create a new instance of the RateLimiter
  const limiter = new RateLimiter();
  
  // Start the limiter
  limiter.start();
  
  // Make API requests using the enqueueRequest method
  limiter.enqueueRequest()
    .then((result) => {
      console.log('API response:', result);
    })
    .catch((error) => {
      console.error('API request failed:', error);
    });
  
  // Stop the limiter when you no longer need it
  limiter.stop();

  export{
    RateLimiter
  }
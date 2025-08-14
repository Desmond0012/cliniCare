import NodeCache from "node-cache";

//create cache
export const cache = new NodeCache({
  stdTTL: 3600, // cache data for 1hr
  checkperiod: 620, //check for expired key every 620 secs
  useClones: false, //better performance for caching system
});

//cache function to save data
export const cacheMiddleware =
  (key, ttl = 600) =>
  async (req, res, next) => {
    //create unique key based on our userId, api routes and query parameters
    const userId = req.user.id || "anonymous";
    const cacheKey = `user_${userId}${key}${req.orignalUrl}_${JSON.stringify(
      req.query
    )}`;
    try {
      const cachedData = cache.get(cacheKey); //retrieve data associated with cachedKey
      if (cachedData) {
        console.log(`catch key for: ${cacheKey}`);
        return res.json(cachedData); //send saved response back to client
      }
      //try to save data from our response
      const originalJSON = res.json;
      //override res.json to cache the response
      res.json = function (data) {
        cache.set(cacheKey, data, ttl); //takes the key, data to be saved, and how long to be saved in cache as arguements
        console.log(`Cache set for key: ${cacheKey}`);
        return originalJSON.call(this, data); //orignalJSON is the res.json first saved, the call is used to invoke the method so that the original res.json is seen with the help of this keyword, ensuring the data can be properly passed to the original json
      };
      next(); // call the next event that is supposed to happen
    } catch (error) {
      console.error("Cache error", error);
      next(error);
    }
  };

export const clearCache =
  (pattern = null, clearAll = false) =>
  (req, res, next) => {
    //get cached keys
    const keys = cache.keys();
    if (clearAll) {
      keys.forEach((key) => cache.del(key));
      console.log("Cleared all cache entries");
      return next();
    }
    const userId = req.user.id || "";
    const userPrefix = userId ? `user_${userId}_` : "";
    // if we have a userId, only clear keys that match both pattern and userId
    const matchingKeys = pattern
      ? keys.filter((key) => {
          if (userId) {
            return key.includes(userPrefix) && key.includes(pattern);
          }
          //if no userId, just match the pattern
          return key.includes(pattern);
        })
      : keys;
    matchingKeys.forEach((key) => cache.del(key));
    console.log(
      `Cleared ${matchingKeys.length} cache enteries for ${
        userId ? `user ${userId}` : "all users"
      }`
    );
    next();
  };

// import NodeCache from "node-cache";

// //CREATE A CACHE INSTANCE
// export const cache = new NodeCache({
//   stdTTL: 3600, // Cache items will expire after 1 hour
//   checkperiod: 620, // Check for expired items every hour
//   useClones: false, // Disable cloning of objects to save memory
// });
// // Function to set a value in the cache
// export const cacheMiddleware =
//   (key, ttl = 600) =>
//   async (req, res, next) => {
//     //create unique key based on our userId , api routes and query parameters
//     const userId = req.user.id || "anonymous";
//     const cacheKey = `user_${userId}_${key}_${req.originalUrl}_${JSON.stringify(
//       req.query
//     )}`;
//     try {
//       const cachedData = cache.get(cacheKey); // Check if data is in cache
//       if (cachedData) {
//         console.log(`cache key for: ${cacheKey}`);
//         return res.json(cachedData); // Return cached data if available
//       }
//       //try to save data from our response
//       const originalJSON = res.json;
//       //override the res.json method to capture the response data
//       res.json = function (data) {
//         cache.set(cacheKey, data, ttl); // takes the key, data to be saved and gow long to be saved in cache in as arguments
//         console.log(`Cache set for key: ${cacheKey}`);
//         return originalJSON.call(this, data); // Call the original res.json method , first saved, the call is used to involk the methed with the correct context, originalJSON.call(this, data); is used to ensure that the context of `this` is preserved or seen with help of the keyword, ensuring the data canbe properly passed to the original json
//       };
//       //call the next event supposed to happen
//       next(); // Call the next middleware or route handler.
//     } catch (error) {
//       console.error("Cache error:", error);
//       next(error); // Pass the error to the next middleware
//     }
//   };

// export const clearCache =
//   (pattern = null, clearAll = false) =>
//   (req, res, next) => {
//     //get cached keys
//     const keys = cache.keys();
//     if (clearAll) {
//       keys.forEach((key) => cache.del(key));
//       console.log("Cleared all cache keys");
//       return next();
//     }
//     const userId = req.user.id || "";
//     const userPrefix = userId ? ` user_&{userId}_ ` : "";
//     // if we have a userId, only clear keys that match both pattern and userId
//     const matchingKeys = pattern
//       ? keys.filter((key) => {
//           if (userId) {
//             return key.includes(userPrefix) && key.includes(pattern);
//           }
//           //if no userId , just match the pattern
//           return key.includes(pattern);
//         })
//       : keys;
//     matchingKeys.forEach((key) => cache.del(key));
//     console.log(
//       `Cleared ${matchingKeys.length} cache enteries for ${
//         userId ? `user ${userId} ` : "all users"
//       }`
//     );
//     next();
//   };

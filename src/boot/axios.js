import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

var baseURL = process.env.DEBUG
  ? "http://127.0.0.1:8000"
  : "https://munirif.vps.webdock.cloud";

var apiURL = `${baseURL}/api`;

const cache = new Map();
const TTL = 30 * 1000;

const api = axios.create({ baseURL: apiURL });

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(
  (config) => {
    const key = JSON.stringify({
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.data,
    });
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < TTL) {
      // Cancel the request and return cached data
      config.adapter = () => {
        return Promise.resolve({
          data: cached.data,
          status: 200,
          statusText: "OK (from cache)",
          headers: {},
          config,
        });
      };
    }
    config.__cacheKey = key;

    const token = localStorage.getItem("token"); // Replace with your token key
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const key = response.config.__cacheKey;
    cache.set(key, {
      data: response.data,
      timestamp: Date.now(),
    });
    // Return the successful response
    return response;
  },
  (error) => {
    // Handle response errors globally
    console.log("API Error:", error);

    // if error.request.reponse

    if (error.response.status === 401) {
      const currentPathName = window.location.pathname;
      if (!currentPathName.startsWith("/index/account")) {
        localStorage.clear();
        window.location = "/";
      }
    }

    if (error.response.status === 500) {
      error.response.data = { error: ["Internal Server Error"] };
    }

    // Example: Show a notification with the error message
    // Notify.create({
    //   type: "negative",
    //   message: error.message || "An error occurred",
    // });

    // You can also handle specific error status codes here
    // if (error.response && error.response.status === 404) {
    //   Notify.create({
    //     type: 'negative',
    //     message: 'Resource not found',
    //   });
    // }

    // Throw the error again to allow it to be handled at the component level
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$baseURL = baseURL;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

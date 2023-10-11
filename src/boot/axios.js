import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

var baseURL = process.env.DEBUG
  ? "http://127.0.0.1:8000/api"
  : "https://munirif.pythonanywhere.com/api";

const api = axios.create({ baseURL: baseURL });

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your token key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Return the successful response
    return response;
  },
  (error) => {
    // Handle response errors globally

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
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

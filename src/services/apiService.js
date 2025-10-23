// apiService.js
import { getCurrentInstance } from "vue";
import { apiFetch } from "./apiFetch"; // Your generic fetch
import { HttpError } from "./apiErrors"; // Your custom error

// Centralized notification configurations
const ERROR_NOTIFICATION_CONFIG = {
  400: (data) => ({
    type: "error",
    title: "Bad Request",
    text: data?.message || "The request was invalid.",
  }),
  401: (data) => ({
    type: "warn",
    title: "Unauthorized",
    text: data?.message || "Please log in again.",
  }),
  403: (data) => ({
    type: "error",
    title: "Forbidden",
    text: data?.message || "Access denied.",
  }),
  404: (data) => ({
    type: "error",
    title: "Not Found",
    text: "The requested resource was not found.",
  }),
  500: (data) => ({
    type: "error",
    title: "Server Error",
    text: data?.message || "Please try again later.",
  }),
  defaultHttp: (status, data) => ({
    type: "error",
    title: `Error ${status}`,
    text: data?.message || "An unexpected HTTP error occurred.",
  }),
  network: (message) => ({
    type: "error",
    title: "Network Error",
    text: message || "Request failed. Check connection.",
  }),
};

// This can be a composable `useApiService` or a plain object service
// Using a composable structure for Vue 3 projects:
export function useApiService() {
  const instance = getCurrentInstance();
  const notifier = instance?.proxy?.$notify; // Access $notify

  // A helper to dispatch notifications
  const notify = (config) => {
    if (notifier && config) {
      notifier(config);
    } else if (config) {
      console.warn("Notifier not available. Error details:", config);
      // Fallback to alert for critical info if no notifier
      // alert(`${config.title}: ${config.text}`);
    }
  };

  async function request(endpoint, options = {}) {
    try {
      return await apiFetch(endpoint, options);
    } catch (error) {
      if (error instanceof HttpError) {
        const configFn =
          ERROR_NOTIFICATION_CONFIG[error.status] || ERROR_NOTIFICATION_CONFIG.defaultHttp;
        notify(configFn(error.status, error.data));

        // Special handling for 401: often involves redirecting or clearing session
        if (error.status === 401) {
          // Example: localStorage.removeItem('token');
          // Example: router.push('/login');
          // You might want to make this configurable or handle it in the component if it varies.
          console.warn("API Service: Caught 401 Unauthorized. Further action may be required.");
        }
      } else {
        // Generic Error (likely network error from apiFetch's own catch)
        notify(ERROR_NOTIFICATION_CONFIG.network(error.message));
      }

      // IMPORTANT: Re-throw the error so the calling component
      // can still react to it if needed (e.g., set loading states,
      // perform component-specific UI changes, or handle 401 redirects locally).
      throw error;
    }
  }

  // You can add specific methods like get, post, etc.
  return {
    request,
    get: (endpoint, options = {}) => request(endpoint, { ...options, method: "GET" }),
    post: (endpoint, body, options = {}) =>
      request(endpoint, {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      }),
    put: (endpoint, body, options = {}) =>
      request(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      }),
    deletes: (endpoint, options = {}) => request(endpoint, { ...options, method: "DELETE" }),
    // ... other HTTP methods
  };
}

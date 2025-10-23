// apiFetch.js
import { HttpError } from "./apiErrors";

const BASE_URL = "https://edlege-python-services.fly.dev" || "/api"; // Example

export async function apiFetch(endpoint, options = {}) {
  const authStore = JSON.parse(localStorage.getItem("authStore"));
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(authStore?.token && { Authorization: `Bearer ${authStore.token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  let response;
  try {
    response = await fetch(url, config);
  } catch (networkError) {
    // Catches DNS, CORS, server unreachable etc.
    console.error("apiFetch - Network Error:", networkError);
    throw new Error(
      networkError.message || "Network request failed. Please check your connection.",
    );
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  let data = null;

  if (isJson) {
    try {
      data = await response.json();
    } catch (parseError) {
      // If response.ok is true but JSON is bad, it's a server issue with its response.
      // If response.ok is false and JSON is bad, we still want to throw HttpError.
      if (!response.ok) {
        // We don't have 'data' to pass to HttpError, but we have the response.
        throw new HttpError(
          `HTTP error ${response.status} with unparseable JSON body.`,
          response,
          null, // Or provide the raw text: await response.text() if needed later
        );
      }
      // For a 2xx with bad JSON, this is a specific kind of problem.
      // Depending on strictness, you might throw, or return null and log.
      console.warn("apiFetch - Received 2xx response but failed to parse JSON:", parseError);
      // Potentially throw new Error("Invalid JSON response from server for a successful request.");
      // For now, let's assume `data` remains `null` which might be handled by the caller.
    }
  } else if (!response.ok) {
    // Handle non-JSON error responses (e.g., plain text or HTML error pages)
    const textContent = await response.text().catch(() => "Could not read error response body.");
    throw new HttpError(
      data?.message || textContent || `Request failed with status ${response.status}`,
      response,
      { message: textContent }, // Make 'data' consistent if possible
    );
  }

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new HttpError(message, response, data);
  }

  return data;
}

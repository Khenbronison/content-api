// apiErrors.js
export class HttpError extends Error {
  constructor(message, response, data) {
    super(message);
    this.name = "HttpError";
    this.response = response; // The full Response object
    this.status = response.status;
    this.data = data; // Parsed error data from the server, if any
  }
}

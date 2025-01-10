var USERLOG_BASE = "https://api.getuserlog.com/api";
var ENDPOINT_VERSION = "/v1";
var ENDPOINTS = {
  /**
   * UserLog Log Endpoint
   */
  LOG: USERLOG_BASE + ENDPOINT_VERSION + "/log",
  /**
   * UserLog Identify Endpoint
   */
  IDENTIFY: USERLOG_BASE + ENDPOINT_VERSION + "/identify",
  /**
   * UserLog Page Endpoint
   */
  PAGE: USERLOG_BASE + ENDPOINT_VERSION + "/page",
};

var HTTPResponseError = class extends Error {
  message;
  constructor(status, statusText, body) {
    super(`HTTP Error Response: ${status} ${statusText}`);
    this.message = this.createReadableString(body);
  }
  /**
   * Create a readable string from the response body
   * @param body
   */
  createReadableString(body) {
    let error = "[UserLog] Failed to publish: ";
    if (body && body.validation && Array.isArray(body.validation.body)) {
      error += body.validation.body.map((item) => item.message).join(", ");
    } else {
      error += `: Please check our docs at https://docs.getuserlog.com`;
    }
    return error;
  }
  toString() {
    return this.message;
  }
  /**
   * Get Error Info as JSON
   */
  toJSON() {
    return {
      message: this.message,
    };
  }
};

function isTimestampInMilliseconds(timestamp) {
  return Math.abs(Date.now() - timestamp) < Math.abs(Date.now() - timestamp * 1e3);
}
function toUnixTimestamp(timestamp) {
  if (!timestamp) return void 0;
  if (timestamp instanceof Date) {
    timestamp = timestamp.getTime();
  }
  if (isTimestampInMilliseconds(timestamp)) {
    timestamp = Math.floor(timestamp / 1e3);
  }
  return timestamp;
}

var UserLog = class {
  api_key;
  project;
  disabled = false;
  /**
   * Construct a new UserLog instance
   * @param api_key UserLog API api_key
   * @param project UserLog project name
   * @param disableTracking Disable tracking
   * for more information, see: docs.getuserlog.com
   */
  constructor({ api_key, project, disableTracking = false }) {
    this.api_key = api_key;
    this.project = project;
    this.disabled = disableTracking || false;
  }
  /**
   * Disable tracking for this instance
   * (this is useful for development)
   */
  disableTracking() {
    this.disabled = true;
  }
  /**
   * Enable tracking for this instance
   * (this is useful for development)
   */
  enableTracking() {
    this.disabled = false;
  }
  /**
   * Check if tracking is disabled
   */
  isTrackingDisabled() {
    return this.disabled;
  }
  /**
   * Get project name
   * @returns project name
   */
  getProject() {
    return this.project;
  }
  /**
   * Creates authorization header
   * @returns Authorization header value
   */
  createAuthorizationHeader() {
    return `Bearer ${this.api_key}`;
  }
  /**
   * Creates headers for requests
   * @private
   */
  createHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: this.createAuthorizationHeader(),
    };
  }
  /**
   * Publish a new event to UserLog
   * @param options
   * @returns true when successfully published
   */
  async track(options) {
    if (this.isTrackingDisabled()) return true;
    const headers = this.createHeaders();
    const method = "POST";
    options.timestamp = toUnixTimestamp(options.timestamp);
    const body = JSON.stringify({
      ...options,
      project: this.getProject(),
    });
    const response = await fetch(ENDPOINTS.LOG, { method, body, headers });
    if (!response.ok) {
      throw new HTTPResponseError(response.status, response.statusText, await response.json());
    }
    return true;
  }
  /**
   * Identify a user
   * @param options
   * @returns true when successfully published
   */
  async identify(options) {
    if (this.isTrackingDisabled()) return true;
    const headers = this.createHeaders();
    const method = "POST";
    const body = JSON.stringify({
      ...options,
      project: this.getProject(),
    });
    const response = await fetch(ENDPOINTS.IDENTIFY, { method, body, headers });
    if (!response.ok) {
      throw new HTTPResponseError(response.status, response.statusText, await response.json());
    }
    return true;
  }
};

export { UserLog };

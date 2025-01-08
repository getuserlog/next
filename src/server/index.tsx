'use strict';

interface TrackOptions {
    timestamp?: number | Date;
    [key: string]: any; // Ermöglicht zusätzliche Eigenschaften
}

interface UserLogConstructor {
    api_key: string;
    project: string;
    disableTracking?: boolean;
}

const USERLOG_BASE = "https://api.getuserlog.com/api";
const ENDPOINT_VERSION = "/v1";
const ENDPOINTS = {
    LOG: USERLOG_BASE + ENDPOINT_VERSION + "/log",
    PAGE: USERLOG_BASE + ENDPOINT_VERSION + "/page",
};

/**
 * Custom HTTP Response Error
 */
class HTTPResponseError extends Error {
    message: string;

    constructor(status: number, statusText: string, body: any) {
        super(`HTTP Error Response: ${status} ${statusText}`);
        this.message = this.createReadableString(body);
    }

    /**
     * Create a readable string from the response body
     * @param body
     */
    private createReadableString(body: any): string {
        let error = "[UserLog] Failed to publish: ";
        if (body?.validation?.body && Array.isArray(body.validation.body)) {
            error += body.validation.body.map((item: any) => item.message).join(", ");
        } else {
            error += ": Please check our docs at https://docs.getuserlog.com";
        }
        return error;
    }

    toString(): string {
        return this.message;
    }

    /**
     * Get Error Info as JSON
     */
    toJSON(): { message: string } {
        return {
            message: this.message,
        };
    }
}

/**
 * Utility function to check if timestamp is in milliseconds
 * @param timestamp
 * @returns boolean
 */
function isTimestampInMilliseconds(timestamp: number): boolean {
    return Math.abs(Date.now() - timestamp) < Math.abs(Date.now() - timestamp * 1e3);
}

/**
 * Convert a timestamp to a Unix timestamp
 * @param timestamp
 * @returns number | undefined
 */
function toUnixTimestamp(timestamp?: number | Date): number | undefined {
    if (!timestamp) return undefined;
    if (timestamp instanceof Date) {
        timestamp = timestamp.getTime();
    }
    if (isTimestampInMilliseconds(timestamp)) {
        return Math.floor(timestamp / 1e3);
    }
    return timestamp;
}

/**
 * UserLog Client
 */
class UserLog {
    private readonly api_key: string;
    private readonly project: string;
    private disabled: boolean = false;

    /**
     * Construct a new UserLog instance
     * @param api_key UserLog API KEY
     * @param project UserLog project name
     * @param disableTracking Disable tracking
     */
    constructor({ api_key, project, disableTracking = false }: UserLogConstructor) {
        this.api_key = api_key;
        this.project = project;
        this.disabled = disableTracking || false;
    }

    /**
     * Disable tracking for this instance
     */
    disableTracking(): void {
        this.disabled = true;
    }

    /**
     * Enable tracking for this instance
     */
    enableTracking(): void {
        this.disabled = false;
    }

    /**
     * Check if tracking is disabled
     */
    isTrackingDisabled(): boolean {
        return this.disabled;
    }

    /**
     * Get project name
     * @returns project name
     */
    getProject(): string {
        return this.project;
    }

    /**
     * Creates authorization header
     * @returns Authorization header value
     */
    private createAuthorizationHeader(): string {
        return `Bearer ${this.api_key}`;
    }

    /**
     * Creates headers for requests
     */
    private createHeaders(): Record<string, string> {
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
    async track(options: TrackOptions): Promise<boolean> {
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
}

export { UserLog };
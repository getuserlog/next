interface TrackOptions {
    timestamp?: number | Date;
    [key: string]: any;
}
interface UserLogConstructor {
    api_key: string;
    project: string;
    disableTracking?: boolean;
}
/**
 * UserLog Client
 */
declare class UserLog {
    private readonly api_key;
    private readonly project;
    private disabled;
    /**
     * Construct a new UserLog instance
     * @param api_key UserLog API KEY
     * @param project UserLog project name
     * @param disableTracking Disable tracking
     */
    constructor({ api_key, project, disableTracking }: UserLogConstructor);
    /**
     * Disable tracking for this instance
     */
    disableTracking(): void;
    /**
     * Enable tracking for this instance
     */
    enableTracking(): void;
    /**
     * Check if tracking is disabled
     */
    isTrackingDisabled(): boolean;
    /**
     * Get project name
     * @returns project name
     */
    getProject(): string;
    /**
     * Creates authorization header
     * @returns Authorization header value
     */
    private createAuthorizationHeader;
    /**
     * Creates headers for requests
     */
    private createHeaders;
    /**
     * Publish a new event to UserLog
     * @param options
     * @returns true when successfully published
     */
    track(options: TrackOptions): Promise<boolean>;
}
export { UserLog };

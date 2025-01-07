interface InsightBase {
    /**
     * Insight title
     * example: "User Count"
     */
    title: string;
    /**
     * Event icon (emoji)
     * must be a single emoji
     * example: "👨"
     */
    icon?: string;
}
/**
 * Options for publishing UserLog insight
 */
interface InsightTrackOptions extends InsightBase {
    /**
     * Insight value
     * example: 100
     */
    value: string | boolean | number;
}
interface InsightIncrementOptions extends InsightBase {
    /**
     * Insight value
     * example: 1
     */
    value: number;
}

type TagKey = Lowercase<string>;
/** Tag Type **/
type Tags = Record<TagKey, string | number | boolean>;
type Parser = 'markdown' | 'text';
/**
 * Options for publishing UserLog events
 */
interface TrackOptions {
    /**
     * Channel name
     * example: "waitlist"
     */
    channel: string;
    /**
     * Event name
     * example: "User Joined"
     */
    event: string;
    /**
     * Event description
     * example: "joe@example.com joined waitlist"
     */
    description?: string;
    /**
     * User ID
     * example: "user-123"
     */
    user_id?: string;
    /**
     * Event icon (emoji)
     * must be a single emoji
     * example: "🎉"
     */
    icon?: string;
    /**
     * Event tags
     * example: { username: "mattie" }
     */
    tags?: Tags;
    /**
     * Send push notification
     */
    notify?: boolean;
    /**
     * Parser for description
     */
    parser?: Parser;
    /**
     * Event timestamp
     */
    timestamp?: number | Date;
}

/** Properties Type **/
type IdentifyProperties = Record<TagKey, string | number | boolean>;
/**
 * Options for publishing UserLog identify
 */
interface IdentifyOptions {
    /**
     * User ID
     * example: "user-123"
     */
    user_id: string;
    /**
     * User properties
     * example: { username: "mattie" }
     */
    properties: IdentifyProperties;
}

/** Properties Type **/
type GroupProperties = Record<TagKey, string | number | boolean>;
interface GroupWithUserOptions {
    /**
     * Group ID
     * example: "group_123"
     */
    group_id: string;
    /**
     * User ID
     * example: "user-123"
     */
    user_id: string;
}
interface GroupWithPropertiesOptions {
    /**
     * Group ID
     * example: "group_123"
     */
    group_id: string;
    /**
     * User ID
     * example: "user-123"
     */
    user_id: string | undefined;
    /**
     * Group properties
     * example: { username: "mattie" }
     */
    properties: GroupProperties;
}
/**
 * Options for publishing UserLog group
 */
type GroupOptions = GroupWithUserOptions | GroupWithPropertiesOptions;

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
     * for more information, see: docs.userlog.com
     */
    constructor({ api_key, project, disableTracking }: {
        api_key: string;
        project: string;
        disableTracking?: boolean;
    });
    /**
     * Disable tracking for this instance
     * (this is useful for development)
     */
    disableTracking(): void;
    /**
     * Enable tracking for this instance
     * (this is useful for development)
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
    protected createAuthorizationHeader(): string;
    /**
     * Creates headers for requests
     * @private
     */
    private createHeaders;
    /**
     * Get insight methods
     */
    get insight(): {
        track: any;
        increment: any;
    };
    /**
     * Publish a new event to UserLog
     * @param options
     * @returns true when successfully published
     */
    track(options: TrackOptions): Promise<boolean>;
    /**
     * Identify a user
     * @param options
     * @returns true when successfully published
     */
    identify(options: IdentifyOptions): Promise<boolean>;
    /**
     * Group a user or update group properties
     * @param options
     * @returns true when successfully published
     */
    group(options: GroupOptions): Promise<boolean>;
    /**
     * Publish a new insight to UserLog
     * @param options
     * @returns true when successfully published
     */
    protected insightTrack(options: InsightTrackOptions): Promise<boolean>;
    /**
     * Increment an insight value
     * @param options
     * @returns true when successfully published
     */
    protected insightIncrement(options: InsightIncrementOptions): Promise<boolean>;
}

export { UserLog };

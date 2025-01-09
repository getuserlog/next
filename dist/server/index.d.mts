type TagKey = Lowercase<string>;
/** Tag Type **/
type Tags = Record<TagKey, string | number | boolean>;
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
   * example: "user@example.com"
   */
  user_id?: string;
  /**
   * Event icon (emoji)
   * must be a single emoji
   * example: "💰"
   */
  icon?: string;
  /**
   * Event tags
   * example: { username: "michael" }
   */
  tags?: Tags;
  /**
   * Send push notification
   */
  notify?: boolean;
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
   * example: "user@example.com"
   */
  user_id: string;
  /**
   * User properties
   * example: { username: "michael" }
   */
  properties: IdentifyProperties;
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
   * @param api_key UserLog API api_key
   * @param project UserLog project name
   * @param disableTracking Disable tracking
   * for more information, see: docs.getuserlog.com
   */
  constructor({ api_key, project, disableTracking }: { api_key: string; project: string; disableTracking?: boolean });
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
}

export { UserLog };

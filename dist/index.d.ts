import React, { PropsWithChildren, useEffect, useState } from 'react';

interface IUserLogProviderProps {
    project: string;
    api_key: string;
}
/**
 * Set up the UserLog provider
 * @param props: IUserLogProviderProps
 * @constructor
 */
declare const UserLogProvider: React.FC<PropsWithChildren<IUserLogProviderProps>>;

type TagKey = Lowercase<string>;
/** Tag Type */
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
     * example: "user@example.com joined waitlist"
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
     * example: "user@example.com"
     */
    user_id: string;
    /**
     * User properties
     * example: { username: "mattie" }
     */
    properties: IdentifyProperties;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type ITracker = {
    /**
     * Set up the tracker with a api_key and project
     * @param api_key: your UserLog api_key
     * @param project: your UserLog project
     */
    setConfig: (api_key: string, project: string) => void;
    /**
     * Set the user id for the tracker
     * @param userId: a unique identifier for the user
     */
    setUserId: (userId: string | number) => void;
    /**
     * Clear the user id for the tracker
     */
    clearUserId: () => void;
    /**
     * Set the debug flag for the tracker
     * @param flag
     */
    setDebug: (flag: boolean) => void;
    /**
     * Track a custom event
     * @param options
     */
    track(options: TrackOptions): void;
    /**
     * Identify user traits
     * @param options
     */
    identify(options: PartialBy<IdentifyOptions, 'user_id'>): void;
};

declare global {
    interface Window {
        userlogq: [keyof ITracker, ...unknown[]][] | undefined;
        userlog: (...args: [keyof ITracker, ...unknown[]]) => void;
        userlogi: boolean;
    }
}

/**
 * UserLog Hook
 * @description
 */

declare function useUserLog(): {
    setDebug: (flag?: boolean) => void;
    setUserId: (userId: string) => void;
    clearUserId: () => void;
    track: (options: TrackOptions) => void;
    identify: (options: PartialBy<IdentifyOptions, 'user_id'>) => void;
};

interface ISetUserIdProps {
    userId: string | null;
}
declare const SetUserIdServerComponent: React.FC<ISetUserIdProps>;

export { UserLogProvider, SetUserIdServerComponent, useUserLog };

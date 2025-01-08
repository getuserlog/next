import React from "react";
interface UserLogProviderProps {
    project: string;
    api_key: string;
    children?: React.ReactNode;
}
/**
 * UserLogProvider Component
 */
export declare const UserLogProvider: React.FC<UserLogProviderProps>;
/**
 * useUserLog Hook
 */
export declare const useUserLog: () => {
    setDebug: (...args: any[]) => Promise<void>;
    setUserId: (...args: any[]) => Promise<void>;
    clearUserId: (...args: any[]) => Promise<void>;
    track: (...args: any[]) => Promise<void>;
};
export {};

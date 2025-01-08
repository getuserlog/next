"use strict";
import React, { createContext, useContext, useState, useCallback } from "react";
import Script from "next/script";

const CDN_URL = "https://app.getuserlog.com/userlog.js";

interface UserLogProviderProps {
  project: string;
  api_key: string;
  children?: React.ReactNode;
}

interface UserLogContextValue {
  ensureInitialized: () => Promise<void>;
}

const UserLogContext = createContext<UserLogContextValue | undefined>(undefined);

/**
 * UserLogProvider Component
 */
export const UserLogProvider: React.FC<UserLogProviderProps> = ({
                                                                  project,
                                                                  api_key,
                                                                  children,
                                                                }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const ensureInitialized = useCallback(async () => {
    if (!isInitialized) {
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (typeof window.userlog === "function") {
            setIsInitialized(true);
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }
  }, [isInitialized]);

  const handleScriptLoad = () => {
    if (typeof window !== "undefined") {
      window.userlogq = window.userlogq || [];
      window.userlog = window.userlog || ((...args) => window.userlogq.push(args));
      window.userlog("setConfig", api_key, project);
      window.userlog("setDebug", false);
      setIsInitialized(true);
    }
  };

  return (
      <UserLogContext.Provider value={{ ensureInitialized }}>
        <Script id="userlog-script" async defer src={CDN_URL} onLoad={handleScriptLoad} />
        {children}
      </UserLogContext.Provider>
  );
};

/**
 * useUserLog Hook
 */
export const useUserLog = () => {
  const context = useContext(UserLogContext);

  if (!context) {
    throw new Error("useUserLog must be used within a UserLogProvider");
  }

  const { ensureInitialized } = context;

  const wrapFunction = (fn: (...args: any[]) => void) => {
    return async (...args: any[]) => {
      await ensureInitialized();
      fn(...args);
    };
  };

  const setDebug = wrapFunction((flag = true) => {
    window.userlog("setDebug", flag);
  });

  const setUserId = wrapFunction((userId: string) => {
    window.userlog("setUserId", userId);
  });

  const clearUserId = wrapFunction(() => {
    window.userlog("clearUserId");
  });

  const track = wrapFunction((options: Record<string, any>) => {
    window.userlog("track", options);
  });

  return {
    setDebug,
    setUserId,
    clearUserId,
    track,
  };
};
"use strict";

import React from "react";
import Script from "next/script";

const CDN_URL = "https://cdn.getuserlog.com/userlog.js";

const UserLogProvider = ({ project, api_key, children }) => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Script, {
      id: "userlog-script",
      async: true,
      defer: true,
      src: CDN_URL,
    }),
    React.createElement(Script, {
      id: "userlog-init",
      dangerouslySetInnerHTML: {
        __html: `
                if (typeof window !== 'undefined') {
                  window.userlogq = window.userlogq || [];
                  window.userlog = window.userlog || ((...args) => window.userlogq.push(args));
                  window.userlog('setConfig', '${api_key}', '${project}');
                  window.userlog('setDebug', false);
                }
              `,
      },
    }),
    children
  );
};

const useUserLog = () => {
  const setDebug = (flag = true) => {
    if (typeof window !== "undefined" && typeof window.userlog === "function") {
      window.userlog("setDebug", flag);
    }
  };

  const setUserId = (userId) => {
    if (typeof window !== "undefined" && typeof window.userlog === "function") {
      window.userlog("setUserId", userId);
    }
  };

  const clearUserId = () => {
    if (typeof window !== "undefined" && typeof window.userlog === "function") {
      window.userlog("clearUserId");
    }
  };

  const track = (options) => {
    if (typeof window === "undefined" || typeof window.userlog !== "function") {
      console.error("[UserLog] userlog script is not initialized.");
      return;
    }
    window.userlog("track", options);
  };

  const identify = (options) => {
    if (typeof window === "undefined" || typeof window.userlog !== "function") {
      console.error("[UserLog] userlog script is not initialized.");
      return;
    }
    window.userlog("identify", options);
  };

  return {
    setDebug,
    setUserId,
    clearUserId,
    track,
    identify,
  };
};

// SetUserIdServerComponent wird nur auf der Client-Seite gerendert
const SetUserIdServerComponent = ({ userId }) => {
  // Verhindert, dass Code auf dem Server ausgeführt wird
  if (typeof window === "undefined") {
    return null;
  }

  return React.createElement(
    Script,
    { id: "userlog-script", type: "text/javascript", strategy: "afterInteractive" },
    `window.userlog('setUserId', ${userId ? `'${userId}'` : null});`
  );
};

export { UserLogProvider, SetUserIdServerComponent, useUserLog };

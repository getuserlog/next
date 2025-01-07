'use strict';

import React from 'react';
import Script from 'next/script';

var CDN_URL = "https://app.getuserlog.com/userlog.js";

var UserLogProvider = ({ project, api_key, children }) => {
  return (
    <>
      {/* Laden des Scripts nur im Client */}
      <Script
        id="userlog-script"
        async
        defer
        src={CDN_URL}
      />
      {/* Initialisierung des Scripts im Client */}
      <Script
        id="userlog-init"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              window.userlogq = window.userlogq || [];
              window.userlog = window.userlog || ((...args) => window.userlogq.push(args));
              window.userlog('setConfig', '${api_key}', '${project}');
              window.userlog('setDebug', false);
            }
          `
        }}
      />
      {children}
    </>
  );
};

var useUserLog = () => {
  const setDebug = (flag = true) => {
    if (typeof window !== 'undefined' && typeof window.userlog === 'function') {
      window.userlog('setDebug', flag);
    }
  };

  const setUserId = (userId) => {
    if (typeof window !== 'undefined' && typeof window.userlog === 'function') {
      window.userlog('setUserId', userId);
    }
  };

  const clearUserId = () => {
    if (typeof window !== 'undefined' && typeof window.userlog === 'function') {
      window.userlog('clearUserId');
    }
  };

  const track = (options) => {
    if (typeof window !== 'undefined' && typeof window.userlog === 'function') {
      window.userlog('track', options);
    }
  };

  const identify = (options) => {
    if (typeof window !== 'undefined' && typeof window.userlog === 'function') {
      window.userlog('identify', options);
    }
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
var SetUserIdServerComponent = ({ userId }) => {
  // Verhindert, dass Code auf dem Server ausgeführt wird
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Script
      id="userlog-script"
      type="text/javascript"
      strategy="afterInteractive"
    >
      {`window.userlog('setUserId', ${userId ? `'${userId}'` : null});`}
    </Script>
  );
};

export { UserLogProvider, SetUserIdServerComponent, useUserLog };

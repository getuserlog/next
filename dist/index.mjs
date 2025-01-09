import React from "react";
import Script from "next/script";

var CDN_URL = "https://cdn.getuserlog.com/userlog.js";
var UserLogProvider = ({ project, api_key, children }) => {
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    /* @__PURE__ */ React.createElement(Script, { id: "userlog-script", async: true, defer: true, src: CDN_URL }),
    /* @__PURE__ */ React.createElement(Script, {
      id: "userlog-init",
      dangerouslySetInnerHTML: {
        __html: `
            window.userlogq = window.userlogq || [];
            window.userlog = window.userlog || ((...args) => window.userlogq.push(args));
            window.userlog('setConfig', '${api_key}', '${project}');
          `,
      },
    }),
    children
  );
};

var setUserId = (userId) => {
  window.userlog("setUserId", userId);
};
var clearUserId = () => {
  window.userlog("clearUserId");
};
var setDebug = (flag = true) => {
  window.userlog("setDebug", flag);
};
var track = (options) => {
  window.userlog("track", options);
};
var identify = (options) => {
  window.userlog("identify", options);
};

var useUserLog = () => {
  return {
    setDebug,
    setUserId,
    clearUserId,
    track,
    identify,
  };
};
var SetUserIdServerComponent = ({ userId }) => {
  return /* @__PURE__ */ React.createElement(
    Script,
    { type: "text/javascript", strategy: "afterInteractive" },
    `window.userlog('setUserId', ${userId ? `'${userId}'` : null});`
  );
};

export { UserLogProvider, SetUserIdServerComponent, useUserLog };

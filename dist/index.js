"use strict";

var React = require("react");
var Script = require("next/script");

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);
var Script__default = /*#__PURE__*/ _interopDefault(Script);

var CDN_URL = "https://cdn.getuserlog.com/userlog.js";
var UserLogProvider = ({ project, api_key, children }) => {
  return /* @__PURE__ */ React__default.default.createElement(
    React__default.default.Fragment,
    null,
    /* @__PURE__ */ React__default.default.createElement(Script__default.default, {
      id: "userlog-script",
      async: true,
      defer: true,
      src: CDN_URL,
    }),
    /* @__PURE__ */ React__default.default.createElement(Script__default.default, {
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
  return /* @__PURE__ */ React__default.default.createElement(
    Script__default.default,
    { type: "text/javascript", strategy: "afterInteractive" },
    `window.userlog('setUserId', ${userId ? `'${userId}'` : null});`
  );
};

exports.UserLogProvider = UserLogProvider;
exports.SetUserIdServerComponent = SetUserIdServerComponent;
exports.useUserLog = useUserLog;

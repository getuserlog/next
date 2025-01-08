'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLog = void 0;
var USERLOG_BASE = "https://api.getuserlog.com/api";
var ENDPOINT_VERSION = "/v1";
var ENDPOINTS = {
    LOG: USERLOG_BASE + ENDPOINT_VERSION + "/log",
    PAGE: USERLOG_BASE + ENDPOINT_VERSION + "/page",
};
/**
 * Custom HTTP Response Error
 */
var HTTPResponseError = /** @class */ (function (_super) {
    __extends(HTTPResponseError, _super);
    function HTTPResponseError(status, statusText, body) {
        var _this = _super.call(this, "HTTP Error Response: ".concat(status, " ").concat(statusText)) || this;
        _this.message = _this.createReadableString(body);
        return _this;
    }
    /**
     * Create a readable string from the response body
     * @param body
     */
    HTTPResponseError.prototype.createReadableString = function (body) {
        var _a;
        var error = "[UserLog] Failed to publish: ";
        if (((_a = body === null || body === void 0 ? void 0 : body.validation) === null || _a === void 0 ? void 0 : _a.body) && Array.isArray(body.validation.body)) {
            error += body.validation.body.map(function (item) { return item.message; }).join(", ");
        }
        else {
            error += ": Please check our docs at https://docs.getuserlog.com";
        }
        return error;
    };
    HTTPResponseError.prototype.toString = function () {
        return this.message;
    };
    /**
     * Get Error Info as JSON
     */
    HTTPResponseError.prototype.toJSON = function () {
        return {
            message: this.message,
        };
    };
    return HTTPResponseError;
}(Error));
/**
 * Utility function to check if timestamp is in milliseconds
 * @param timestamp
 * @returns boolean
 */
function isTimestampInMilliseconds(timestamp) {
    return Math.abs(Date.now() - timestamp) < Math.abs(Date.now() - timestamp * 1e3);
}
/**
 * Convert a timestamp to a Unix timestamp
 * @param timestamp
 * @returns number | undefined
 */
function toUnixTimestamp(timestamp) {
    if (!timestamp)
        return undefined;
    if (timestamp instanceof Date) {
        timestamp = timestamp.getTime();
    }
    if (isTimestampInMilliseconds(timestamp)) {
        return Math.floor(timestamp / 1e3);
    }
    return timestamp;
}
/**
 * UserLog Client
 */
var UserLog = /** @class */ (function () {
    /**
     * Construct a new UserLog instance
     * @param api_key UserLog API KEY
     * @param project UserLog project name
     * @param disableTracking Disable tracking
     */
    function UserLog(_a) {
        var api_key = _a.api_key, project = _a.project, _b = _a.disableTracking, disableTracking = _b === void 0 ? false : _b;
        this.disabled = false;
        this.api_key = api_key;
        this.project = project;
        this.disabled = disableTracking || false;
    }
    /**
     * Disable tracking for this instance
     */
    UserLog.prototype.disableTracking = function () {
        this.disabled = true;
    };
    /**
     * Enable tracking for this instance
     */
    UserLog.prototype.enableTracking = function () {
        this.disabled = false;
    };
    /**
     * Check if tracking is disabled
     */
    UserLog.prototype.isTrackingDisabled = function () {
        return this.disabled;
    };
    /**
     * Get project name
     * @returns project name
     */
    UserLog.prototype.getProject = function () {
        return this.project;
    };
    /**
     * Creates authorization header
     * @returns Authorization header value
     */
    UserLog.prototype.createAuthorizationHeader = function () {
        return "Bearer ".concat(this.api_key);
    };
    /**
     * Creates headers for requests
     */
    UserLog.prototype.createHeaders = function () {
        return {
            "Content-Type": "application/json",
            Authorization: this.createAuthorizationHeader(),
        };
    };
    /**
     * Publish a new event to UserLog
     * @param options
     * @returns true when successfully published
     */
    UserLog.prototype.track = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, method, body, response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isTrackingDisabled())
                            return [2 /*return*/, true];
                        headers = this.createHeaders();
                        method = "POST";
                        options.timestamp = toUnixTimestamp(options.timestamp);
                        body = JSON.stringify(__assign(__assign({}, options), { project: this.getProject() }));
                        return [4 /*yield*/, fetch(ENDPOINTS.LOG, { method: method, body: body, headers: headers })];
                    case 1:
                        response = _c.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        _a = HTTPResponseError.bind;
                        _b = [void 0, response.status, response.statusText];
                        return [4 /*yield*/, response.json()];
                    case 2: throw new (_a.apply(HTTPResponseError, _b.concat([_c.sent()])))();
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    return UserLog;
}());
exports.UserLog = UserLog;

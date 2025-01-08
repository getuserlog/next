"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserLog = exports.UserLogProvider = void 0;
var react_1 = __importStar(require("react"));
var script_1 = __importDefault(require("next/script"));
var CDN_URL = "https://cdn.getuserlog.com/userlog.js";
var UserLogContext = (0, react_1.createContext)(undefined);
/**
 * UserLogProvider Component
 */
var UserLogProvider = function (_a) {
    var project = _a.project, api_key = _a.api_key, children = _a.children;
    var _b = (0, react_1.useState)(false), isInitialized = _b[0], setIsInitialized = _b[1];
    var ensureInitialized = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!isInitialized) return [3 /*break*/, 2];
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var interval = setInterval(function () {
                                if (typeof window.userlog === "function") {
                                    setIsInitialized(true);
                                    clearInterval(interval);
                                    resolve();
                                }
                            }, 100);
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [isInitialized]);
    var handleScriptLoad = function () {
        if (typeof window !== "undefined") {
            window.userlogq = window.userlogq || [];
            window.userlog = window.userlog || (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return window.userlogq.push(args);
            });
            window.userlog("setConfig", api_key, project);
            window.userlog("setDebug", false);
            setIsInitialized(true);
        }
    };
    return (react_1.default.createElement(UserLogContext.Provider, { value: { ensureInitialized: ensureInitialized } },
        react_1.default.createElement(script_1.default, { id: "userlog-script", async: true, defer: true, src: CDN_URL, onLoad: handleScriptLoad }),
        children));
};
exports.UserLogProvider = UserLogProvider;
/**
 * useUserLog Hook
 */
var useUserLog = function () {
    var context = (0, react_1.useContext)(UserLogContext);
    if (!context) {
        throw new Error("useUserLog must be used within a UserLogProvider");
    }
    var ensureInitialized = context.ensureInitialized;
    var wrapFunction = function (fn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ensureInitialized()];
                        case 1:
                            _a.sent();
                            fn.apply(void 0, args);
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
    var setDebug = wrapFunction(function (flag) {
        if (flag === void 0) { flag = true; }
        window.userlog("setDebug", flag);
    });
    var setUserId = wrapFunction(function (userId) {
        window.userlog("setUserId", userId);
    });
    var clearUserId = wrapFunction(function () {
        window.userlog("clearUserId");
    });
    var track = wrapFunction(function (options) {
        window.userlog("track", options);
    });
    return {
        setDebug: setDebug,
        setUserId: setUserId,
        clearUserId: clearUserId,
        track: track,
    };
};
exports.useUserLog = useUserLog;

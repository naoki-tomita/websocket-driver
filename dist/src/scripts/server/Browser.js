"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var FunctionEvaluator_1 = require("./FunctionEvaluator");
var fs_1 = require("fs");
var Sleep_1 = require("./utils/Sleep");
var Logger_1 = require("../common/utils/Logger");
function findElement(selector) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, FunctionEvaluator_1.evaluate(function (selector) {
                    return document.querySelector(selector);
                }, selector)];
        });
    });
}
exports.findElement = findElement;
var Browser = /** @class */ (function () {
    function Browser() {
    }
    Browser.prototype.captureScreenShot = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var png;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.Logger.debug("captureScreenShot");
                        return [4 /*yield*/, FunctionEvaluator_1.evaluateAsync(function (result) {
                                html2canvas(document.body)
                                    .then(function (canvas) {
                                    result(canvas.toDataURL());
                                })
                                    .catch(function (e) {
                                    result("ERROR");
                                });
                            })];
                    case 1:
                        png = _a.sent();
                        Logger_1.Logger.debug("captured");
                        if (filePath) {
                            fs_1.writeFileSync(filePath, new Buffer(png.replace("data:image/png;base64,", ""), "base64"));
                        }
                        return [2 /*return*/, png];
                }
            });
        });
    };
    Browser.prototype.getUrl = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FunctionEvaluator_1.evaluate(function (path) {
                            setTimeout(function () {
                                location.assign(path);
                            }, 100);
                        }, path)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Sleep_1.sleep(1000)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Browser.prototype.reload = function (forceReload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FunctionEvaluator_1.evaluate(function (forceReload) {
                            setTimeout(function () {
                                location.reload(forceReload);
                            }, 100);
                        }, forceReload)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Sleep_1.sleep(1000)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Browser;
}());
exports.Browser = Browser;
exports.browser = new Browser();
//# sourceMappingURL=Browser.js.map
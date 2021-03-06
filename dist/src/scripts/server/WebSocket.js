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
var socketio = require("socket.io");
var fs = require("fs");
var https = require("https");
var http = require("http");
var path = require("path");
var Random_1 = require("../common/utils/Random");
var io;
var socket = null;
var serverSession = Random_1.createRandomString(8);
var clientSession = null;
function waitMessage(s) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (r, x) {
                    var y = setTimeout(x, 10000);
                    s.once("message", function (m) {
                        clearTimeout(y);
                        r(m);
                    });
                })];
        });
    });
}
function initialize() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var server;
        return __generator(this, function (_a) {
            if (!io) {
                server = process.env.HTTPS === "true"
                    ? https.createServer({
                        key: fs.readFileSync(path.join(__dirname, "../../../../", "./server.key")),
                        cert: fs.readFileSync(path.join(__dirname, "../../../../", "./server.crt")),
                    })
                    : http.createServer();
                console.log("Server listening...");
                server.listen(8081);
                io = socketio.listen(server);
            }
            return [2 /*return*/, new Promise(function (resolve) {
                    io.on("connection", function (s) { return __awaiter(_this, void 0, void 0, function () {
                        var clSession, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, waitMessage(s)];
                                case 1:
                                    clSession = _a.sent();
                                    console.log("Establish request from: " + clSession);
                                    if ((clientSession && clSession !== clientSession) ||
                                        !clSession) {
                                        s.disconnect();
                                    }
                                    else {
                                        clientSession = clSession;
                                        s.send(serverSession);
                                    }
                                    return [4 /*yield*/, waitMessage(s)];
                                case 2:
                                    result = _a.sent();
                                    if (result === serverSession + ":" + clientSession) {
                                        console.log("Connected to: " + clSession);
                                        socket = s;
                                    }
                                    else {
                                        s.disconnect();
                                    }
                                    s.once("disconnect", function () {
                                        socket = null;
                                    });
                                    resolve(s);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                })];
        });
    });
}
exports.initialize = initialize;
function send(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!socket) return [3 /*break*/, 2];
                    return [4 /*yield*/, initialize()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, new Promise(function (resolve) {
                        socket.once("message", function (data) {
                            try {
                                var parsedData = JSON.parse(data);
                                resolve(parsedData);
                            }
                            catch (e) {
                                resolve(data);
                            }
                        });
                        socket.send(JSON.stringify(data));
                    })];
            }
        });
    });
}
exports.send = send;
//# sourceMappingURL=WebSocket.js.map
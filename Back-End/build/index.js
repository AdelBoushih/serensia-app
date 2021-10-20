"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var suggestions_1 = require("./Test1/suggestions");
var emails_1 = require("./Test2/emails");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var bodyParser = require("body-parser");
var cors = require("cors");
var app = (0, express_1.default)();
var port = 8100; // default port to listen
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
// define a route handler for the default home page
app.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("/test1 pour Le premier Test & /test2 pour Le deuxième Test");
        return [2 /*return*/];
    });
}); });
app.get("/test1", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var suggestions;
    return __generator(this, function (_a) {
        suggestions = (0, suggestions_1.GetSuggestions)("gros", ["gros", "gris", "graisse", "gras", "aggressif", "go", "ros", "gro"], 2);
        res.send(suggestions);
        return [2 /*return*/];
    });
}); });
app.post("/test2", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, emails;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                browser = { getHtml: emails_1.getHtml };
                return [4 /*yield*/, (0, emails_1.GetEmailsInPageAndChildPages)(browser, path_1.default.normalize((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.url), 3)];
            case 1:
                emails = _b.sent();
                res.send(emails);
                return [2 /*return*/];
        }
    });
}); });
// start the Express server
app.listen(port, function () {
    console.log("Application started at http://localhost:" + port);
    console.log("To run unit tests, npm run test");
});

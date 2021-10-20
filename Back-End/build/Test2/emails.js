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
exports.getHtml = exports.getLinks = exports.GetEmailsInPageAndChildPages = void 0;
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var util_1 = __importDefault(require("util"));
var path_1 = __importDefault(require("path"));
// Convert fs.readFile into Promise version
var readFile = util_1.default.promisify(fs_1.default.readFile);
/**
 * Returns list of emails provided in HMTL documents in forms <a href="mailto:emails" ...
 * @param browser IWebBrowser exposting getHtml method
 * @param url url of document that will be parsed
 * @param maximumDepth maximum depth of search
 * @returns list of emails
 */
var GetEmailsInPageAndChildPages = function (browser, url, maximumDepth) { return __awaiter(void 0, void 0, void 0, function () {
    var filePaths, emails, currentDepth, currentFileIndex, filePath, links;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filePaths = [url];
                emails = [];
                currentDepth = 0;
                currentFileIndex = 0;
                _a.label = 1;
            case 1:
                if (!(currentFileIndex < filePaths.length && currentDepth <= maximumDepth)) return [3 /*break*/, 4];
                filePath = filePaths[currentFileIndex];
                if (!filePath) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.getLinks)(filePath, browser)];
            case 2:
                links = _a.sent();
                links.forEach(function (link) {
                    if (link.includes("mailto")) {
                        var email = link.replace("mailto:", "");
                        if (!emails.includes(email))
                            emails.push(email);
                    }
                    else {
                        var filePath_1 = getAbsoluteFilePath(url, link);
                        if (!filePaths.includes(filePath_1))
                            filePaths.push(filePath_1);
                    }
                });
                if (links.length)
                    currentDepth++;
                _a.label = 3;
            case 3:
                currentFileIndex++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, emails];
        }
    });
}); };
exports.GetEmailsInPageAndChildPages = GetEmailsInPageAndChildPages;
/**
 * Returns list of links that are present in a HTML file in forms <a href="...
 * @param browser IWebBrowser exposting getHtml method
 * @param filePath url of docuemnt that will be parsed
 * @returns list of links
 */
var getLinks = function (filePath, browser) { return __awaiter(void 0, void 0, void 0, function () {
    var data, links, $_1, linkTags;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.getHtml(filePath)];
            case 1:
                data = _a.sent();
                links = [];
                if (data) {
                    $_1 = cheerio_1.default.load(data);
                    linkTags = $_1("a");
                    linkTags.each(function (_idx, el) {
                        var link = $_1(el).attr("href");
                        if (link)
                            links.push(link);
                    });
                }
                return [2 /*return*/, links];
        }
    });
}); };
exports.getLinks = getLinks;
/**
 * Returns the html content of a file
 * @param url url path of a file
 * @returns a string : HTML content of files
 */
var getHtml = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, readFile(url, "utf8")];
            case 1:
                data = _b.sent();
                return [2 /*return*/, data];
            case 2:
                _a = _b.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getHtml = getHtml;
/**
 * Build the absolute path of a file
 * @param parentFilePath the parent absoulute path
 * @param link the link to the child
 * @returns absolute file path
 */
var getAbsoluteFilePath = function (parentFilePath, link) {
    // Vérifier si l'url est Verifie that the URL is based on "/" or "\"
    var slash = parentFilePath.includes("/") ? "/" : "\\";
    var absolutePath = parentFilePath.slice(0, parentFilePath.lastIndexOf(slash));
    var fileName = link.replace("." + slash, "");
    return path_1.default.resolve(absolutePath, fileName);
};

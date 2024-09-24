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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIDFromNickname = getUserIDFromNickname;
exports.getUserStatsFromUserID = getUserStatsFromUserID;
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
require("dotenv/config");
const BASE_URL = process.env.ER_BASE_URL;
function getUserIDFromNickname(apiKey, nickname) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield axios_1.default.get(`${BASE_URL}/v1/user/nickname`, {
                headers: { "x-api-key": `${apiKey}` },
                params: { query: nickname },
            });
            return (_a = response.data.user) === null || _a === void 0 ? void 0 : _a.userNum;
        }
        catch (error) {
            console.error(`Error fetching user ID: ${error.message}`);
            return undefined;
        }
    });
}
function getUserStatsFromUserID(apiKey, userNum, seasonID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${BASE_URL}/v1/user/stats/${userNum}/${seasonID}`, {
                headers: { "x-api-key": apiKey },
            });
            // If userStats array is present and has elements, map them
            const stats = response.data.userStats.map(models_1.transformUserStat);
            // Create the User object
            const user = {
                id: userNum,
                nickname: response.data.userStats[0].nickname,
                stats: stats,
            };
            return user;
        }
        catch (error) {
            console.error(`Error fetching user stats: ${error.message}`);
            return undefined;
        }
    });
}

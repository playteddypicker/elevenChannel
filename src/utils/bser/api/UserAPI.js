"use strict";
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
async function getUserIDFromNickname(apiKey, nickname) {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/v1/user/nickname`, {
            headers: { "x-api-key": `${apiKey}` },
            params: { query: nickname },
        });
        return response.data.user?.userNum;
    }
    catch (error) {
        console.error(`Error fetching user ID: ${error.message}`);
        return undefined;
    }
}
async function getUserStatsFromUserID(apiKey, userNum, seasonID) {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/v1/user/stats/${userNum}/${seasonID}`, {
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
}

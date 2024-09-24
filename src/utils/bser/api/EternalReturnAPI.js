"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserAPI_1 = require("./UserAPI");
class ERClient {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async getUserStatsByNickname(nickname, seasonID) {
        try {
            const userNum = await (0, UserAPI_1.getUserIDFromNickname)(this.apiKey, nickname);
            if (userNum) {
                return await (0, UserAPI_1.getUserStatsFromUserID)(this.apiKey, userNum, seasonID);
            }
        }
        catch (error) {
            console.error(`Failed to get user stats by nickname: ${error.message}`);
        }
        return undefined;
    }
}
exports.default = ERClient;

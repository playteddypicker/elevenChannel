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
Object.defineProperty(exports, "__esModule", { value: true });
const UserAPI_1 = require("./UserAPI");
class ERClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    getUserStatsByNickname(nickname, seasonID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userNum = yield (0, UserAPI_1.getUserIDFromNickname)(this.apiKey, nickname);
                if (userNum) {
                    return yield (0, UserAPI_1.getUserStatsFromUserID)(this.apiKey, userNum, seasonID);
                }
            }
            catch (error) {
                console.error(`Failed to get user stats by nickname: ${error.message}`);
            }
            return undefined;
        });
    }
}
exports.default = ERClient;

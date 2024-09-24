"use strict";
//get User Stats from this url : user/stats/{userNum}/{seasonId}
//then we can get this response data, aligned by season Id array.
// e.g.:
// userStats: [
//  {
//  seasonId: 3,
//  userNum: 1234566,
//  matchingmode: 3,
//  mmr: 2431,
//  nickname: asdf, ....
//  },
//  {
//  seasonId: 4,
//  ...
//  }
// ]
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformUserStat = transformUserStat;
// Transform OriginResponseCharacterStat to CharacterStat
function transformCharacterStat(origin) {
    return {
        characterCode: origin.characterCode,
        usage: origin.usage,
        maxKill: origin.maxKillings, // assuming "maxKillings" maps to "maxKill"
        top3: origin.top3,
        wins: origin.wins,
        top3Rage: origin.top3Rage,
        averageRank: origin.averageRank,
    };
}
// Transform OriginResponseUserStat to UserStat
function transformUserStat(origin) {
    return {
        seasonId: origin.seasonId,
        matchingMode: origin.matchingMode,
        matchingTeamMode: origin.matchingTeamMode,
        mmr: origin.mmr,
        rank: origin.rank,
        rankSize: origin.rankSize,
        nickname: origin.nickname,
        totalGames: origin.totalGames,
        totalWins: origin.totalWins,
        totalTeamKills: origin.totalTeamKills,
        rankPercent: origin.rankpercent, // assuming "rankpercent" maps to "rankPercent"
        average: {
            rank: origin.averageRank,
            kills: origin.averageKills,
            assists: origin.averageAssistants, // assuming "averageAssistants" maps to "assists"
            hunt: origin.averageHunt,
        },
        top: {
            first: origin.top1,
            second: origin.top2,
            third: origin.top3,
        },
        characterStats: origin.characterStats.map(transformCharacterStat),
    };
}

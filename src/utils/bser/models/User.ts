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

// 시즌별 유저의 전적 기록이 배열형태로 담겨있음
export interface User {
  id: number;
  nickname: string;
  stats: UserStat[];
}

export interface OriginResponseCharacterStat {
  characterCode: number;
  usage: number;
  maxKillings: number;
  top3: number;
  wins: number;
  top3Rage: number;
  averageRank: number;
}

export interface OriginResponseUserStat {
  seasonId: number;
  uesrNum: number;
  matchingMode: number;
  matchingTeamMode: number;
  mmr: number;
  nickname: string;
  rank: number;
  rankSize: number;
  totalGames: number;
  totalWins: number;
  totalTeamKills: number;
  rankpercent: number;
  averageRank: number;
  averageKills: number;
  averageAssistants: number;
  averageHunt: number;
  top1: number;
  top2: number;
  top3: number;
  top5: number;
  top7: number;
  characterStats: OriginResponseCharacterStat[];
}

// Stats of User on that season.
export interface UserStat {
  seasonId: number;
  matchingMode: number;
  matchingTeamMode: number;
  mmr: number;
  rank: number;
  rankSize: number;
  nickname: string;
  totalGames: number;
  totalWins: number;
  totalTeamKills: number;
  rankPercent: number;
  average: {
    rank: number;
    kills: number;
    assists: number;
    hunt: number;
  };
  top: {
    first: number;
    second: number;
    third: number;
  };
  characterStats: CharacterStat[];
}

// UserStat에서 각 캐릭터별 정보가 담겨있음. 평딜 등..
export interface CharacterStat {
  characterCode: number;
  usage: number;
  maxKill: number;
  top3: number;
  wins: number;
  top3Rage: number;
  averageRank: number;
}

// Transform OriginResponseCharacterStat to CharacterStat
function transformCharacterStat(
  origin: OriginResponseCharacterStat,
): CharacterStat {
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
export function transformUserStat(origin: OriginResponseUserStat): UserStat {
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

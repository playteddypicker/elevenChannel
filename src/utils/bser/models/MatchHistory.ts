export type MatchCharacterData = {
  characterNum: number;
  skinCode: number;
  characterLevel: number;
  masteryLevel: Record<string, number>;
  equipment: Record<string, number>;

};

export type MatchGameData = {
  rank: number; //등수
  teamNumber: number;
  kill: {
    player: number;
    team: number;
    monster: Record<string, number>;
    terminate: number;
    clutch: number;
  };
  escape: number; //1: 탈출 안함, 2: 탈출실패, 3: 탈출성공
  death: number;
  assist: number;
  monsterkill: number;
  credit: number; //total user gain credits.
  duration: {
    playtime: number;
    watchtime: number;
    total: number;
  } //seconds.
  startDate: string;
  mmr: {
    gain: number;
    after: number;
    before: number;
    teamAvg: number;
  };
  damage: {
    toPlayer: {
      total: number;
      basic: number; //평타딜
      skill: number; //스증딜
      item: number; //아이템 고유효과로 준 딜(레바테인 유신드 등)
      fixed: number; //고정딜 (키아라 궁같은거?)
    };
    toMonster: number;
    fromMonster: number;
    fromPlayer: {
      total: number;
    }
  };
  heal: {
    total: number; //healAmount임.
    team: number; //팀원에게 준 회복량.
    protect: number; //보호막 회복량.
  };
  sight: {
    viewScore: number; //시야점수. viewcontribution에 있음
    add: {
      surveilance: number; //감카
      telephoto: number; //망카
    };
    remove: {
      surveilance: number;
      telephoto: number;
    }
    securityConsole: number;
  }
}

// Match data of each player.
export interface UserMatchResult {
  user: {
    id: number;
    nickname: string;
  };
  gameId: number;
  seasonId: number;
  character: MatchCharacterData;
  gameData: MatchGameData;
}

// infos of each game, per users.
// games/{gameID}
// max 24 players.
export interface MatchResult {
  version: number;
  gameId: number;
  seasonId: number;
  weather: {
    main: number;
    sub: number;
  };
  users: UserMatchResult[];
}

// we can get match history of recent 90 days through this url:
// user/games/{userNum}.
// then get array of match result.
export interface UserMatches {
  userId: number;
  userGames: MatchResult[];
}

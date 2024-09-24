import { getUserIDFromNickname, getUserStatsFromUserID } from "./UserAPI";
import { User } from "../models/User";

class ERClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async getUserStatsByNickname(
    nickname: string,
    seasonID: number,
  ): Promise<User | undefined> {
    try {
      const userNum = await getUserIDFromNickname(this.apiKey, nickname);
      if (userNum) {
        return await getUserStatsFromUserID(this.apiKey, userNum, seasonID);
      }
    } catch (error: any) {
      console.error(`Failed to get user stats by nickname: ${error.message}`);
    }

    return undefined;
  }

  /*
  public async getRecentMatchHistoryByNickname(nickname: string, matchCount: number): Promise<MatchHistory[] | undefined> {
    try {
      const userNum = await getUserIDFromNickname(this.apiKey, nickname);
      if (userNum) {
        return await getMatchHistoryFromUsernum(this.apiKey, userNum, matchCount);
      }
      return undefined;
    } catch (error) {
      console.error(`Failed to get recent match history by nickname: ${error.message}`);
      return undefined;
    }
  }*/
}

export default ERClient;

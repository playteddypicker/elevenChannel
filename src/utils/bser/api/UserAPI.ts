import axios, { AxiosResponse } from "axios";
import { User, OriginResponseUserStat, transformUserStat } from "../models";
import "dotenv/config";

const BASE_URL = process.env.ER_BASE_URL;

export async function getUserIDFromNickname(
  apiKey: string,
  nickname: string,
): Promise<number | undefined> {
  try {
    const response: AxiosResponse<{
      code: number;
      message: string;
      user: { userNum: number; nickname: string };
    }> = await axios.get(`${BASE_URL}/v1/user/nickname`, {
      headers: { "x-api-key": `${apiKey}` },
      params: { query: nickname },
    });

    return response.data.user?.userNum;
  } catch (error: any) {
    console.error(`Error fetching user ID: ${error.message}`);
    return undefined;
  }
}

export async function getUserStatsFromUserID(
  apiKey: string,
  userNum: number,
  seasonID: number,
): Promise<User | undefined> {
  try {
    const response: AxiosResponse<{
      code: number;
      message: string;
      userStats: OriginResponseUserStat[];
    }> = await axios.get(`${BASE_URL}/v1/user/stats/${userNum}/${seasonID}`, {
      headers: { "x-api-key": apiKey },
    });

    // If userStats array is present and has elements, map them
    const stats = response.data.userStats.map(transformUserStat);

    // Create the User object
    const user: User = {
      id: userNum,
      nickname: response.data.userStats[0].nickname,
      stats: stats,
    };

    return user;
  } catch (error: any) {
    console.error(`Error fetching user stats: ${error.message}`);
    return undefined;
  }
}

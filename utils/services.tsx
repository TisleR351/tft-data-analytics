import { fetchTFTAccountByPUUID } from '@/utils/TFTAccountProvider';
import { fetchSummonerLeagueByID } from '@/utils/leagueProvider';
import {
  ImageData,
  FetchOrCreateByGameName,
  FetchOrCreateByPUUID,
  GlobalAccount,
  RequestError,
} from '@/types/services';
import { TFTAccount } from '@/types/TFTAccount';
import { League } from '@/types/league';
import {
  fetchRiotAccountByPUUID,
  fetchRiotAccountByRiotID,
} from '@/utils/fetchRiotFromClient';
import { useState } from 'react';

export function isRequestError(object: any): object is RequestError {
  return (
    'status' in object &&
    'status_code' in object.status &&
    'message' in object.status &&
    object.status.status_code != 200
  );
}

export async function fetchGlobalAccount(
  params: FetchOrCreateByPUUID | FetchOrCreateByGameName
) {
  const riotAccount =
    'puuid' in params
      ? await fetchRiotAccountByPUUID(params.puuid)
      : await fetchRiotAccountByRiotID(params.gameName, params.tagLine);

  if (isRequestError(riotAccount)) {
    return {
      status: { message: 'Error fetching your account', status_code: 500 },
    } as RequestError;
  }

  const TFTAccount = (await fetchTFTAccountByPUUID(riotAccount.puuid)) as
    | TFTAccount
    | RequestError;

  if (isRequestError(TFTAccount)) {
    return {
      status: { message: 'Error fetching your account', status_code: 500 },
    } as RequestError;
  }

  const accountLeague = (await fetchSummonerLeagueByID(
    TFTAccount.id
  )) as League[];

  return {
    ...riotAccount,
    ...TFTAccount,
    league: [...accountLeague],
  } as GlobalAccount;
}

type Category = 1 | 2 | 3 | 4;

export function categorizeTrait(
  tier_current: number,
  tier_total: number
): Category {
  if (tier_total === 1) return 3;
  return Math.min(tier_current, tier_total) as Category;
}

export async function fetchImageInfos(object: string, item_ID: string) {
  const response = await fetch(
    `/${process.env.NEXT_PUBLIC_TFT_VERSION}/${object}/data/${object}.json`
  );
  const data = await response.json();
  return Object.values(data.data as ImageData[]).find(
    (entity: ImageData) => entity.id === `${item_ID}`
  );
}

export async function fetchImageUrl(object: string, item_ID: string) {
  const imageData = await fetchImageInfos(object, item_ID);
  return (
    imageData &&
    `/${process.env.NEXT_PUBLIC_TFT_VERSION}/${object}/img/${imageData.image.full}`
  );
}

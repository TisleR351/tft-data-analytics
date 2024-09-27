import { TFTAccount } from '@/types/TFTAccount';

export async function fetchTFTAccountByPUUID(puuid: string) {
  const TFTAccount = await fetch(
    `/riot-api/euw1/tft/summoner/v1/summoners/by-puuid/${puuid}`
  );
  return (await TFTAccount.json()) as TFTAccount;
}

export async function fetchTFTAccountByID(id: string) {
  const TFTAccount = await fetch(
    `/riot-api/euw1/tft/summoner/v1/summoners/by-account/${id}`
  );
  return (await TFTAccount.json()) as TFTAccount;
}

export async function fetchTFTAccountBySummonerID(summonerId: string) {
  const TFTAccount = await fetch(
    `/riot-api/euw1/tft/summoner/v1/summoners/${summonerId}`
  );
  return (await TFTAccount.json()) as TFTAccount;
}

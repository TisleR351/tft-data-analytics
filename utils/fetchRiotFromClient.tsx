import { RiotAccount } from '@/types/riotAccount';
import { RequestError } from '@/types/services';
import { AccountMatches, Match } from '@/types/matches';

export async function fetchRiotAccountByRiotID(
  gameName: string,
  tagLine: string
) {
  const url = new URL('/api/riot_account', window.location.origin);
  url.searchParams.append('gameName', gameName);
  url.searchParams.append('tagLine', tagLine);

  const riotAccountResponse = await fetch(url);
  return (await riotAccountResponse.json()) as RiotAccount | RequestError;
}

export async function fetchRiotAccountByPUUID(puuid: string) {
  const url = new URL('/api/riot_account', window.location.origin);
  url.searchParams.append('puuid', puuid);

  const riotAccountResponse = await fetch(url);
  return (await riotAccountResponse.json()) as RiotAccount | RequestError;
}

export async function fetchMatchByID(gameId: string) {
  const url = new URL('/api/matches', window.location.origin);
  url.searchParams.append('gameId', gameId);

  const matchResponse = await fetch(url);
  return (await matchResponse.json()) as Match;
}

function setAccountMatchesURL(
  puuid: string,
  start?: string,
  endTime?: string,
  startTime?: string,
  count?: string
) {
  const url = new URL('/api/account_matches', window.location.origin);
  url.searchParams.append('puuid', puuid);

  if (start) {
    url.searchParams.append('start', start);
  }
  if (endTime) {
    url.searchParams.append('endTime', endTime);
  }
  if (startTime) {
    url.searchParams.append('startTime', startTime);
  }
  if (count) {
    url.searchParams.append('count', count);
  }

  return url;
}

export async function fetchAccountMatchesByPUUID(
  puuid: string,
  start?: string,
  endTime?: string,
  startTime?: string,
  count?: string
) {
  const url = setAccountMatchesURL(puuid, start, endTime, startTime, count);

  const accountMatchResponse = await fetch(url);
  return (await accountMatchResponse.json()) as AccountMatches | RequestError;
}

export async function updateAccountMatchesByPUUID(
  puuid: string,
  start?: string,
  endTime?: string,
  startTime?: string,
  count?: string
) {
  const url = setAccountMatchesURL(puuid, start, endTime, startTime, count);

  const accountMatchResponse = await fetch(url, {
    method: 'PATCH',
  });
  return (await accountMatchResponse.json()) as AccountMatches | RequestError;
}

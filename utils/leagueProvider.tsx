import { League } from '@/types/league';

export async function fetchSummonerLeagueByID(summoner_id: string) {
  const summonerLeague = await fetch(
    `/riot-api/euw1/tft/league/v1/entries/by-summoner/${summoner_id}`
  );
  return (await summonerLeague.json()) as League[];
}

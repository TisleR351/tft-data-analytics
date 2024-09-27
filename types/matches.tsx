export interface Unit {
  character_id: string;
  itemNames: string[];
  name: string;
  rarity: number;
  tier: number;
}

export interface Trait {
  name: string;
  num_units: number;
  style: number;
  tier_current: number;
  tier_total: number;
}

export interface Participant {
  augments: string[];
  companion: Companion;
  gold_left: number;
  last_round: number;
  level: number;
  missions: any;
  placement: number;
  players_eliminated: number;
  puuid: string;
  time_eliminated: number;
  total_damage_to_players: number;
  traits: Trait[];
  units: Unit[];
}

interface Companion {
  content_ID: string;
  item_ID: number;
  skin_ID: number;
  species: string;
}

interface MatchInfo {
  endOfGameResult: string;
  gameCreation: bigint;
  gameId: bigint;
  game_datetime: bigint;
  game_length: bigint;
  game_version: string;
  mapId: number;
  participants: Participant[];
  queueId: number;
  queue_id: number;
  tft_game_type: string;
  tft_set_core_name: string;
  tft_set_number: number;
}

interface Metadata {
  data_version: string;
  match_id: string;
  participants: string[];
}

export interface Match {
  metadata: Metadata;
  info: MatchInfo;
}

export interface AccountMatches {
  puuid: string;
  date: Date;
  matches: string[];
}

import { League } from '@/types/league';

export interface GlobalAccount {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  gameName: string;
  tagLine: string;
  league: League[];
}

export interface RequestError {
  status: ErrorStatus;
}

export interface ErrorStatus {
  message: string;
  status_code: number;
}

export interface FetchOrCreateByGameName {
  gameName: string;
  tagLine: string;
}

export interface FetchOrCreateByPUUID {
  puuid: string;
}

export interface FadeOutMessageType {
  message: string;
  type: string;
}

export interface ImageData {
  id: string;
  name: string;
  tier: string;
  image: SpriteImage;
}

export interface SpriteImage {
  full: string;
  group: string;
  sprite: string;
  h: number;
  w: number;
  x: number;
  y: number;
}

export interface DataTrait {
  id: string;
  name: string;
  image: SpriteImage;
}

export interface EntityImageProps {
  item_ID: number | string;
  width: number;
  height: number;
}

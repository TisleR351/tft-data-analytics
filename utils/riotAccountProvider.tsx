import { MongoClient, Db, Collection } from 'mongodb';
import clientPromise from '@/lib/mongodb';

import { RiotAccount } from '@/types/riotAccount';
import {
  FetchOrCreateByGameName,
  FetchOrCreateByPUUID,
} from '@/types/services';

export async function fetchOrCreateRiotAccount(
  query: FetchOrCreateByGameName | FetchOrCreateByPUUID,
  apiUrl: string
): Promise<RiotAccount | null> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('tft_data_analytics');
    const collection: Collection<RiotAccount> = db.collection('riot_accounts');

    const existingAccount: RiotAccount | null =
      'puuid' in query
        ? await collection.findOne({ puuid: query.puuid })
        : await collection.findOne({
            gameName: { $regex: new RegExp(`^${query.gameName}$`, 'i') },
            tagLine: { $regex: new RegExp(`^${query.tagLine}$`, 'i') },
          });

    if (existingAccount) {
      return existingAccount;
    }

    const response: Response = await fetch(apiUrl, {
      headers: {
        'X-Riot-Token': process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Riot API');
    }

    const riotAccount: RiotAccount = await response.json();
    await collection.insertOne(riotAccount);

    return riotAccount;
  } catch (error) {
    console.error('Error in fetching Riot Account:', error);
    return null;
  }
}

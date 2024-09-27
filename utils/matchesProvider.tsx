import { AccountMatches, Match } from '@/types/matches';
import { Collection, Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { RequestError } from '@/types/services';

export async function fetchOrCreateAccountMatches(
  puuid: string,
  apiUrl: string
) {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('tft_data_analytics');
    const collection: Collection<AccountMatches> =
      db.collection('account_matches');

    const existingAccountMatches: AccountMatches | null =
      await collection.findOne({
        puuid: puuid,
      });

    if (existingAccountMatches) {
      return existingAccountMatches;
    }

    const response: Response = await fetch(apiUrl, {
      headers: {
        'X-Riot-Token': process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Riot API');
    }

    const matches: string[] = await response.json();
    const now = new Date();

    const customMatch: AccountMatches = {
      puuid: puuid,
      date: now,
      matches: matches,
    };
    await collection.insertOne(customMatch);

    return {
      puuid: puuid,
      matches: matches,
    };
  } catch (error) {
    console.error('Error in fetching Riot Account:', error);
    return null;
  }
}
export async function updateAccountMatches(puuid: string, apiUrl: string) {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('tft_data_analytics');
    const collection: Collection<AccountMatches> =
      db.collection('account_matches');

    const existingAccountMatches: AccountMatches | null =
      await collection.findOne({
        puuid: puuid,
      });

    if (!existingAccountMatches) {
      return {
        status: {
          message: 'You are trying to update a non-existing account match',
          status_code: 404,
        },
      } as RequestError;
    }

    const date = new Date(existingAccountMatches.date);
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);

    if (date > fiveMinutesAgo) {
      return {
        status: {
          message: "You can't update more than once every 2 minutes",
          status_code: 429,
        },
      } as RequestError;
    }

    const response: Response = await fetch(apiUrl, {
      headers: {
        'X-Riot-Token': process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Riot API');
    }

    const matches: string[] = await response.json();
    const customMatch: AccountMatches = {
      puuid: puuid,
      date: now,
      matches: matches,
    };
    await collection.updateOne({ puuid: puuid }, { $set: customMatch });

    return {
      puuid: puuid,
      date: now,
      matches: matches,
    };
  } catch (error) {
    console.error('Error in fetching Riot Account:', error);
    return null;
  }
}

export async function fetchOrCreateMatch(
  id: string,
  apiUrl: string
): Promise<Match | null> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('tft_data_analytics');
    const collection: Collection<Match> = db.collection('matches');

    const existingMatch: Match | null = await collection.findOne({
      'metadata.match_id': id,
    });

    if (existingMatch) {
      return existingMatch;
    }

    const response: Response = await fetch(apiUrl, {
      headers: {
        'X-Riot-Token': process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Riot API');
    }

    const match: Match = await response.json();
    await collection.insertOne(match);

    return match;
  } catch (error) {
    console.error('Error in fetching Riot Account:', error);
    return null;
  }
}

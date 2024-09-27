import { NextResponse } from 'next/server';
import { fetchOrCreateRiotAccount } from '@/utils/riotAccountProvider';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameName = searchParams.get('gameName');
  const tagLine = searchParams.get('tagLine');
  const puuid = searchParams.get('puuid');

  if (gameName && tagLine) {
    try {
      const account = await fetchOrCreateRiotAccount(
        { gameName: gameName, tagLine: tagLine },
        `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
      );
      return NextResponse.json(account);
    } catch (error) {
      return NextResponse.json(
        { status: { message: 'Internal Server Error', status_code: 500 } },
        { status: 500 }
      );
    }
  } else if (puuid) {
    try {
      const account = await fetchOrCreateRiotAccount(
        { puuid: puuid },
        `https://europe.api.riotgames.com/account/v1/accounts/by-puuid/${puuid}`
      );
      return NextResponse.json(account);
    } catch (error) {
      return NextResponse.json(
        { status: { message: 'Internal Server Error', status_code: 500 } },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { status: { message: 'Invalid Request Parameters', status_code: 500 } },
      { status: 500 }
    );
  }
}

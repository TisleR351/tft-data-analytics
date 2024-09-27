import { NextResponse } from 'next/server';
import { fetchOrCreateMatch } from '@/utils/matchesProvider';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('gameId');

  if (gameId) {
    try {
      const account = await fetchOrCreateMatch(
        gameId,
        `https://europe.api.riotgames.com/tft/match/v1/matches/${gameId}`
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

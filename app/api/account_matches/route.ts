import { NextResponse } from 'next/server';
import {
  fetchOrCreateAccountMatches,
  updateAccountMatches,
} from '@/utils/matchesProvider';

function setProps(request: Request) {
  const { searchParams } = new URL(request.url);
  const puuid = searchParams.get('puuid');
  const start = searchParams.get('start');
  const endTime = searchParams.get('endTime');
  const startTime = searchParams.get('endTime');
  const count = searchParams.get('count');

  let queryParams = `?`;

  if (start) {
    queryParams += `&start=${encodeURIComponent(start)}`;
  }
  if (endTime) {
    queryParams += `&endTime=${encodeURIComponent(endTime)}`;
  }
  if (startTime) {
    queryParams += `&startTime=${encodeURIComponent(startTime)}`;
  }
  if (count) {
    queryParams += `&count=${encodeURIComponent(count)}`;
  }

  return {
    puuid: puuid,
    url:
      `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids` +
      queryParams,
  };
}

export async function GET(request: Request) {
  const props = setProps(request);

  if (props.puuid) {
    try {
      const matches = await fetchOrCreateAccountMatches(props.puuid, props.url);
      return NextResponse.json(matches);
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
export async function PATCH(request: Request) {
  const props = setProps(request);
  if (props.puuid) {
    try {
      const matches = await updateAccountMatches(props.puuid, props.url);
      return NextResponse.json(matches);
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

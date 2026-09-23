import { NextResponse } from 'next/server';
import { getLatestStreams } from '@/lib/youtube';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageToken = searchParams.get('pageToken') || '';
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  const data = await getLatestStreams(limit, pageToken);
  return NextResponse.json(data);
}
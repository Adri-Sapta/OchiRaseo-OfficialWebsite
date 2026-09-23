import { NextResponse } from 'next/server';
import { getDetailedStreamStats } from '@/lib/youtube';

export async function GET() {
  const data = await getDetailedStreamStats(20);
  return NextResponse.json(data);
}
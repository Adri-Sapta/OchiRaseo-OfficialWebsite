import { NextResponse } from 'next/server';
import { getChannelStats } from '@/lib/youtube';

export async function GET() {
  const data = await getChannelStats();
  return NextResponse.json(data);
}
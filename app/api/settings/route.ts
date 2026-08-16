import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/storage';

export async function GET() {
  try {
    const settings = serverDb.getSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = serverDb.updateSettings(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

const DEFAULT_SETTINGS = {
  id: 'admissions_config',
  startDate: '2026-06-01',
  endDate: '2026-08-31',
  academicYear: '2026-27',
  admissionsEnabled: true,
};

// GET /api/admin/settings
export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection('settings');

    let settings: any = await collection.findOne({ id: 'admissions_config' });

    if (!settings) {
      // Seed default settings if not exists
      await collection.insertOne({ ...DEFAULT_SETTINGS });
      settings = { ...DEFAULT_SETTINGS };
    }

    // Exclude Mongo _id field from API response
    const { _id, ...rest } = settings;
    return NextResponse.json({ success: true, data: rest });
  } catch (error: any) {
    console.error('Settings GET API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST /api/admin/settings (Update Settings)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { startDate, endDate, academicYear, admissionsEnabled } = body;

    // Validation
    if (!startDate || !endDate || !academicYear) {
      return NextResponse.json(
        { success: false, error: 'Missing required configuration fields' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection('settings');

    const updateDoc = {
      id: 'admissions_config',
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      academicYear: academicYear.trim(),
      admissionsEnabled: Boolean(admissionsEnabled),
      updatedAt: new Date().toISOString(),
    };

    await collection.updateOne(
      { id: 'admissions_config' },
      { $set: updateDoc },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: updateDoc });
  } catch (error: any) {
    console.error('Settings POST API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}

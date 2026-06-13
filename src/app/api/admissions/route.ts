import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export interface Applicant {
  id: string;
  studentName: string;
  applyingClass: string;
  guardianName: string;
  contactPhone: string;
  previousSchool: string;
  additionalNotes: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  adminNotes?: string;
  createdAt: string;
}

let isMigrated = false;

// Migration helper to transfer JSON records to MongoDB
async function checkAndMigrate(collection: any) {
  if (isMigrated) return;
  try {
    const count = await collection.countDocuments();
    if (count === 0) {
      const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'applicants.json');
      try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const applicants = JSON.parse(fileContent) as Applicant[];
        if (Array.isArray(applicants) && applicants.length > 0) {
          console.log(`[MongoDB Migration] Migrating ${applicants.length} JSON records to MongoDB...`);
          await collection.insertMany(applicants);
          console.log('[MongoDB Migration] Migration finished successfully.');
        }
      } catch (error: any) {
        if (error.code !== 'ENOENT') {
          console.error('[MongoDB Migration] Error reading file for migration:', error);
        }
      }
    }
    isMigrated = true;
  } catch (error) {
    console.error('[MongoDB Migration] Database connection or migration error:', error);
  }
}

// GET handler to fetch all applicants
export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection('applicants');

    // Run migration checks
    await checkAndMigrate(collection);

    // Fetch all applicants, sorted by createdAt descending
    const applicants = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Map documents to match the Applicant interface (excluding the _id ObjectId object)
    const formattedApplicants = applicants.map((doc) => {
      const { _id, ...rest } = doc;
      return rest;
    });

    return NextResponse.json({ success: true, data: formattedApplicants });
  } catch (error: any) {
    console.error('API GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch applicants' },
      { status: 500 }
    );
  }
}

// POST handler to submit a new application
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, applyingClass, guardianName, contactPhone, previousSchool, additionalNotes } = body;

    // Basic Validation
    if (!studentName || !applyingClass || !guardianName || !contactPhone || !previousSchool) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newApplicant: Applicant = {
      id: crypto.randomUUID(),
      studentName: studentName.trim(),
      applyingClass: applyingClass.trim(),
      guardianName: guardianName.trim(),
      contactPhone: contactPhone.trim(),
      previousSchool: previousSchool.trim(),
      additionalNotes: (additionalNotes || '').trim(),
      status: 'Pending',
      adminNotes: '',
      createdAt: new Date().toISOString(),
    };

    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection('applicants');

    // Run migration checks
    await checkAndMigrate(collection);

    // Insert into collection
    await collection.insertOne(newApplicant);

    return NextResponse.json({ success: true, data: newApplicant }, { status: 201 });
  } catch (error: any) {
    console.error('API POST Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit application' },
      { status: 500 }
    );
  }
}

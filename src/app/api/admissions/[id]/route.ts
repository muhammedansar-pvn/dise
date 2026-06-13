import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

// PATCH handler to update status or adminNotes of a single applicant
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection('applicants');

    // Prepare update payload
    const updateData: any = {};
    if (status !== undefined) {
      if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
        return NextResponse.json(
          { success: false, error: 'Invalid status value' },
          { status: 400 }
        );
      }
      updateData.status = status;
    }
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    // Perform database update using string UUID `id`
    const result = await collection.updateOne(
      { id: id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Applicant not found' },
        { status: 404 }
      );
    }

    // Retrieve and return the updated document
    const updatedDoc = await collection.findOne({ id: id });
    if (!updatedDoc) {
      return NextResponse.json(
        { success: false, error: 'Applicant not found' },
        { status: 404 }
      );
    }

    const { _id, ...updatedApp } = updatedDoc;

    return NextResponse.json({ success: true, data: updatedApp });
  } catch (error: any) {
    console.error('API PATCH Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update applicant' },
      { status: 500 }
    );
  }
}

// DELETE handler to remove a single applicant
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection('applicants');

    const result = await collection.deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Applicant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Applicant deleted successfully' });
  } catch (error: any) {
    console.error('API DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete applicant' },
      { status: 500 }
    );
  }
}

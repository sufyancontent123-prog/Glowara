import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/storage';

export async function GET() {
  try {
    const inquiries = serverDb.getInquiries();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, phone, serviceType } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const newInquiry = serverDb.addInquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'Website Inquiry',
      serviceType: serviceType || 'General Inquiry',
      message: message.trim(),
      status: 'new',
      priority: 'normal'
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been safely recorded in our database. Muhammad Saqib / Glowora support will reach back shortly.',
        data: newInquiry
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error processing inquiry' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, priority, adminNotes, replySent } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID is required for update' },
        { status: 400 }
      );
    }

    const updated = serverDb.updateInquiry(id, {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(adminNotes !== undefined && { adminNotes }),
      ...(replySent !== undefined && { replySent })
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    const deleted = serverDb.deleteInquiry(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}

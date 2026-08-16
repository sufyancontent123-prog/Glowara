import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/storage';

export async function GET() {
  try {
    const orders = serverDb.getOrders();
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.customerName || !body.customerEmail || !body.items || body.items.length === 0) {
      return NextResponse.json({ success: false, error: 'Order details incomplete' }, { status: 400 });
    }
    const order = serverDb.addOrder(body);
    return NextResponse.json({ success: true, data: order, message: 'Order placed successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to place order' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id || !body.status) {
      return NextResponse.json({ success: false, error: 'Order ID and status required' }, { status: 400 });
    }
    const updated = serverDb.updateOrder(body.id, body.status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}

import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { FindOrderItem, OrderItemResponse } from '@/lib/handlers';

export async function GET (
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string, orderId: string };
  }
): Promise<NextResponse<OrderItemResponse | {} >> {

  if ((!Types.ObjectId.isValid(params.userId)) || (!Types.ObjectId.isValid(params.orderId))) {
    return NextResponse.json({}, { status: 400 });
  }

  const orderItems = await FindOrderItem(params.userId, params.orderId);
  if (orderItems === null) {
    return NextResponse.json({}, { status: 404 });
  }

  // 200: successssssssssssss
  return NextResponse.json(orderItems);
}
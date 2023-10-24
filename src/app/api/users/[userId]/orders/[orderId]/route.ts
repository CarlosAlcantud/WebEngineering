import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { OrderResponse, getUser, getOrder} from '@/lib/handlers';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId:string ,orderId: string };
  }
): Promise<NextResponse<OrderResponse> | {}> {


  if ( !Types.ObjectId.isValid(params.userId) || !Types.ObjectId.isValid(params.orderId) ) {
    return NextResponse.json({error: 'invalid userId or invalid orderID'}, { status: 400 });
  }
  
  const order = await getOrder(params.userId, params.orderId);

  if (order === null) {
    return NextResponse.json({error: 'User not found or order not found'}, { status: 404 });
  }

  return NextResponse.json(order);
}
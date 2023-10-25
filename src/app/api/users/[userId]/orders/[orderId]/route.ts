import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { OrderResponse, getUser, getOrder} from '@/lib/handlers';

import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId:string ,orderId: string };
  }
): Promise<NextResponse<OrderResponse> | {}> {
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  if ( !Types.ObjectId.isValid(params.userId) || !Types.ObjectId.isValid(params.orderId) ) {
    return NextResponse.json({error: 'invalid userId or invalid orderID'}, { status: 400 });
  }

  if (session.user._id !== params.userId) {
    return NextResponse.json({}, { status: 403 });
  }
  
  const order = await getOrder(params.userId, params.orderId);

  if (order === null) {
    return NextResponse.json({error: 'User not found or order not found'}, { status: 404 });
  }

  return NextResponse.json(order);
}
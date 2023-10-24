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


  //now we check if the user exists or not 
  const user = await getUser(params.userId);
  

  if (user === null || !Types.ObjectId.isValid(params.orderId) ) {
    return NextResponse.json({error: 'invalid userId'}, { status: 404 });
  }
  if (!Types.ObjectId.isValid(params.orderId)) {
    return NextResponse.json({}, { status: 400 });
  }

  const order = await getOrder(params.userId, params.orderId);

  if (order === null) {
    return NextResponse.json({error: 'User not found or order not found'}, { status: 404 });
  }

  return NextResponse.json(order);
}
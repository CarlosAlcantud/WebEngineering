import { NextRequest, NextResponse } from 'next/server';
import { OrdersResponse, getOrders, getUser} from '@/lib/handlers';
import { Types } from 'mongoose';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
): Promise<NextResponse<OrdersResponse | {} >>{
  
  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json({error: 'Invalid user ID '}, { status: 400 });
  }


  //Check if the user exists or not 
  const user = await getUser(params.userId);
  if (!user ) {
    return NextResponse.json({error: 'User not found'}, { status: 404 });
  }


  const orders = await getOrders(params.userId);


  if (orders === null) {
    return NextResponse.json({error: 'There is no orders'}, { status: 404 });
  }

  // TODO: Return 200  
  return NextResponse.json(orders);
} 
import { NextRequest, NextResponse } from 'next/server';
import { getCartItems, CartItemsResponse } from '@/lib/handlers';
import { Types } from 'mongoose';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
): Promise<NextResponse<CartItemsResponse | {} >>{
  
  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json({}, { status: 400 });
  }

  const cartItems = await getCartItems(params.userId);
  if (cartItems === null) {
    return NextResponse.json({}, { status: 404 });
  }

  // TODO: Return 200  
  return NextResponse.json(cartItems);
} 

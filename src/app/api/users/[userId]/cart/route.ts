import { NextRequest, NextResponse } from 'next/server';
import { getCartItems, CartItemsResponse } from '@/lib/handlers';
import { Types } from 'mongoose';

import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';


export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
): Promise<NextResponse<CartItemsResponse | {} >>{

  const session: Session | null = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }


  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json({error: 'Invalid userID'}, { status: 400 });
  }

  if (session.user._id !== params.userId) {
    return NextResponse.json({}, { status: 403 });
  }
  const cartItems = await getCartItems(params.userId);


  if (cartItems === null) {
    return NextResponse.json({error: 'User not found'}, { status: 404 });
  }

  // TODO: Return 200  
  return NextResponse.json(cartItems);
} 

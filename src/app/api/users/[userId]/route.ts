import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { getUser, UserResponse } from '@/lib/handlers';
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
): Promise<NextResponse<UserResponse> | {}> {
   
  const session: Session | null = await getServerSession(authOptions); //Second Practice
  
  //Second Practice
  if (!session?.user) {
    return NextResponse.json({}, { status: 401 }); 
  }


  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json({error: 'Invalid userId'}, { status: 400 });
  }

  //Second Practice
  if (session.user._id !== params.userId) {
    return NextResponse.json({}, { status: 403 });
  }


  
  const user = await getUser(params.userId);

  if (user === null) {
    return NextResponse.json({error: 'User not found'}, { status: 404 });
  }

  return NextResponse.json(user);
}
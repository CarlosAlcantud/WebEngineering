import { NextRequest, NextResponse } from 'next/server';
import { createUser, CreateUserResponse } from '@/lib/handlers';
import { UsersResponse, getUsers } from '@/lib/handlers';

export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateUserResponse> | {}> {
  const body = await request.json();

  if (!body.email || !body.password || !body.name || !body.surname || !body.address || !body.birthdate) {
    return NextResponse.json({
      error: 'Invalid request. This can happen if the request body is invalid or incomplete, or if the e-mail address of the user is already in use.'}, 
      { status: 400 });
  }

  const userId = await createUser(body);

  if (userId === null) {
    return NextResponse.json({error: 'Something happend on the function returning the users'}, { status: 404 });
  }

  const headers = new Headers();
  headers.append('Location', `/api/users/${userId._id}`);
  return NextResponse.json({ _id: userId._id }, { status: 201, headers: headers });
}
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////    Create a GET FOR USERS /////    ////  ///// /////   ///// 
////  //////  ///// //////     /////    ////  ///// /////   /////  ////  //////  ///// //////   

export async function GET(
  request: NextRequest
): Promise<NextResponse<UsersResponse>>  {
  const users = await getUsers();

  return NextResponse.json(users);
}


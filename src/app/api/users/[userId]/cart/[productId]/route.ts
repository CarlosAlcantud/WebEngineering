import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { deleteProduct, deleteProductResponse ,getCartItems, getProduct, getUser,UpdateCartItem,UpdateCartResponse} from '@/lib/handlers';


import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';


/// ////  ////////  ////  /////   /// //// ////  ////////  ////  ///// 
////  ////////  ////  /////   ////  ////////  ////  ///// 
////  ////////  ////  ///// ////  ////////  ////  ///// 
/////   METHOD PUT FOR MODIFIYING THE QTY OF A PRODUCT IN A CART

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string; productId: string };
  }
): Promise<NextResponse<UpdateCartResponse> | {}> {

  const body = await request.json();


  const session: Session | null = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }


  if (body.qty <= 0 || (!Types.ObjectId.isValid(params.userId)) || (!Types.ObjectId.isValid(params.productId))) {

    return NextResponse.json({error: 'Invalid user ID, invalid product ID or number of items not greater than 0.'}, { status: 400 });
 }

 if (session.user._id !== params.userId) {
  return NextResponse.json({}, { status: 403 });
}

  if (!body.qty) {
    return NextResponse.json({error: 'The qty is missing'}, { status: 400 });
  }

  //I call the method to update the cart
  const cartItems = await UpdateCartItem(
    params.userId,
    params.productId,
    body.qty
  );

  //Now I get the cart updated to show it. 
  if(!cartItems){
    return NextResponse.json({error: 'User not found or product not found.'}, { status: 404 });
  }
  const updatedCart = await getCartItems(params.userId);

  //I check if the product its created 
  if(cartItems?.createdOrUpdated){
    return NextResponse.json(updatedCart,{status: 201});

  }; 

 
  //If the product already exists

  return NextResponse.json(updatedCart);
}
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
/////  //////       //////   DELETE OF A PRODUCT FROM A CART BY THE ID  ////// /////   ////   ////   //// 


export async function DELETE(
  request: NextRequest,
  {
    params,
  }:{
    params:{ userId: string, productId : string }
  }
): Promise<NextResponse<deleteProductResponse> | {}> {
  
  //We check that both of the ids are valid 
  const session: Session | null = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }


  if (!Types.ObjectId.isValid(params.userId) || !Types.ObjectId.isValid(params.productId)) {
    return NextResponse.json({}, { status: 400 });
  }

  if (session.user._id !== params.userId) {
    return NextResponse.json({}, { status: 403 });
  }

  //now we check if the user and the product exists or not 
  const user = await getUser(params.userId);
  const product = await getProduct(params.productId);

  if (user === null || product === null) {
    return NextResponse.json({}, { status: 404 });
  }


  //We call the deleteProduct to remove the product from the cart 
  const deleted = await deleteProduct(params.userId, params.productId);

  if (deleted === null) {
    return NextResponse.json({}, { status: 404 });
  }

  //Now that the product it`s been removed we return the cart item of the user. 
  
  const cartItems = await getCartItems(params.userId);
  if (cartItems === null) {
    return NextResponse.json({}, { status: 404 });
  }

  // Return 200  
  return NextResponse.json(cartItems);
}
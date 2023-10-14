import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { deleteProduct, deleteProductResponse ,getCartItems, getProduct, getUser} from '@/lib/handlers';


// export async function PUT(
//   request: NextRequest,
//   {
//     params,
//   }: {
//     params: { userId: string, productId: string };
//   }
// ): Promise<NextResponse<UpdateCartItemResponse | {} >> {

//   const body = await request.json();
//   console.log(body);            // request body
//   if (!body.qty || (!Types.ObjectId.isValid(params.userId)) || (!Types.ObjectId.isValid(params.productId))) {
//     return NextResponse.json({}, { status: 400 });
//   }

//   const cartItems.cartItems = await updateCartItem(params.userId, params.productId, body.qty);
//   if (cartItems === null) {
//     return NextResponse.json({}, { status: 404 });
//   }

//   // TODO: Return 200 or 201 depending on whether a new cart item has been created 
//   //201: product not in the cart -> new entry created
//   if (cartItems.itemCreated) {
//     return NextResponse.json({}, { status: 201 });
//   }
//   // 200: successssssssssssss
//   return NextResponse.json(cartItems);
// }

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

  if (!Types.ObjectId.isValid(params.userId) || !Types.ObjectId.isValid(params.productId)) {
    return NextResponse.json({}, { status: 400 });
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
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { deleteProduct, deleteProductResponse ,getCartItems, getProduct, getUser,UpdateCartItem,UpdateCartResponse} from '@/lib/handlers';


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

  if (body.qty < 0 || (!Types.ObjectId.isValid(params.userId)) || (!Types.ObjectId.isValid(params.productId))) {

    return NextResponse.json({error: 'Invalid user ID, invalid product ID or number of items not greater than 0.'}, { status: 400 });
 }

  const user = await getUser(params.userId);

  const product = await getProduct(params.productId);

  if (!user ) {
    return NextResponse.json({error: 'User not found'}, { status: 404 });
  }

  if (!product) {
    return NextResponse.json({error: 'Product not found'}, { status: 404 });
  }


  if (!body.qty) {
    return NextResponse.json({error: 'The qty is missing'}, { status: 400 });
  }

  const cartItems = await UpdateCartItem(
    params.userId,
    params.productId,
    body.qty
  );


  const userProjection = {
    _id: false,
    cartItem: {
      product: true,
      qty: true,
    },
  };
  //¿How can I manage if the response of the cart is modify or its created?


  //TODO: return 200 or 201 dependiendo on whether a new cart has been created
  return NextResponse.json(cartItems);
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
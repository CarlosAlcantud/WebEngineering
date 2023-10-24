import { NextRequest, NextResponse } from 'next/server';
import { OrdersResponse, getOrders, getUser, CreateOrderResponse,createOrder} from '@/lib/handlers';
import { Types } from 'mongoose';

/////////////////////////          ORDERS  ///////////////////////////////////


////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////    Create a GET FOR ORDERS /////    ////  ///// /////   ///// 
////  //////  ///// //////     /////    ////  ///// /////   /////  ////  //////  ///// //////   


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

  const orders = await getOrders(params.userId);


  if (orders === null) {
    return NextResponse.json({error: 'User not found'}, { status: 404 });
  }

  // TODO: Return 200  
  return NextResponse.json(orders);
} 
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////    Create a POST FOR ORDERS /////    ////  ///// /////   ///// 
////  //////  ///// //////    Creating an Order  /////    ////  ///// /////   /////  ////  //////  ///// //////   
///
export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
): Promise<NextResponse<CreateOrderResponse> | {}> {
  const body = await request.json();


  if (!body|| (!Types.ObjectId.isValid(params.userId)) ) {

    return NextResponse.json({error: 'Invalid user ID or invalid request. The latter can happen if the request body is invalid or incomplete, or the cart is empty.'}, { status: 400 });
 }

  const user = await getUser(params.userId);


  if (!user ) {
    return NextResponse.json({error: 'User not found'}, { status: 404 });
  }

  //I call the method to create the order 
  const orderId = await createOrder(params.userId,body);

  if(orderId == null){
    return NextResponse.json({}, { status: 400 });
  }

  //return the order Id. 
  const headers = new Headers();
  headers.append('Location', `/api/orders/${orderId._id}`);
  return NextResponse.json({ _id: orderId._id }, { status: 201, headers: headers });
}
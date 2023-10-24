import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { getProduct, productResponse } from '@/lib/handlers';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { productId: string };
  }
): Promise<NextResponse<productResponse> | {}> {
  
  if (!Types.ObjectId.isValid(params.productId)) {
    return NextResponse.json({error: 'invalid productId'}, { status: 400 });
  }

  const product = await getProduct(params.productId);
  

  if (product === null) {
    return NextResponse.json({error: 'Product not found'}, { status: 404 });
  }

  return NextResponse.json(product);
}
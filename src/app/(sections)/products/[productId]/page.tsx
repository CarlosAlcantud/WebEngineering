import { Types } from 'mongoose';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/handlers';
import React from 'react';
import CartItemCounter from '@/components/CartItemCounter';
export default async function Product({
  params,
}: {
  params: { productId: string };
}) {

  
  if (!Types.ObjectId.isValid(params.productId)) {
    notFound();
  }

  const product = await getProduct(params.productId);

  if (product === null) {
    notFound();
  }

  

  return (
    <div>
      <h1 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
        {product.name}
      </h1>


      <div className='grid lg:grid-cols-2 gap-4 items-start'>
        
        <div className='flex flex-col items-center'>
          <div className='aspect-h-1 aspect-w-2 w-full h-20 overflow-hidden rounded-lg bg-gray-200 '>
           <img src={product.img} className='h-full w-full object-cover object-center group-hover:opacity-75'/>
          </div>

          
          <div>
           
            <div className='text-5xl text-gray-700 mt-6'>
              {product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </div>

           
            <div className='flex items-center justify-center mt-4'>

                
              <CartItemCounter productId={params.productId} />

              
        
            </div>
          </div>
          {/** */}

        </div>
        
        
        <div className='flex flex-col items-start justify-center pl-5'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Product Details</h2>
          {product.description && <p className='text-lg text-gray-600'>{product.description}</p>}
          
        </div>


      </div>
    </div>
  );
}
import { Types } from 'mongoose';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/handlers';
import React from 'react';

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

  const quantityRef = React.createRef<HTMLInputElement>();

  const increment = () => {
    if (quantityRef.current) {
      quantityRef.current.value = (Number(quantityRef.current.value) + 1).toString();
    }
  };
  
  const decrement = () => {
    if (quantityRef.current && Number(quantityRef.current.value) > 0) {
      quantityRef.current.value = (Number(quantityRef.current.value) - 1).toString();
    }
  };

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

          {/* Apartado para el precio y los botones */}
          <div>
            {/* Apartado para el precio */}
            <div className='text-5xl text-gray-700 mt-6'>
              {product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </div>

            {/* Apartado para los botones  */}
            <div className='flex items-center justify-center mt-4'>
              
              <div className='flex items-center justify-center' >
                
                <button type='button' className='px-3 py-2 border border-gray-300 rounded-l-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>

                </button>
                <input type='number' min='0' defaultValue='0' id='quantity' name='quantity' className='px-3 py-2 border-t border-b text-center border-gray-300 w-30'/>
                <button type='button'  className='px-3 py-2 border border-gray-300 rounded-r-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>

                </button>

              </div>
              {/*Boton de eliminar  */}
              <div className='pl-3'>
                
                <button type='button' className='px-3 py-2 bg-pink-200 border border-gray-300 rounded-md'>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </button>

              </div>
        
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
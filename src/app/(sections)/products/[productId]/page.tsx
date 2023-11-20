import { Types } from 'mongoose';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/handlers';


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
          <div className='aspect-h-1 aspect-w-2 w-full overflow-hidden rounded-lg bg-gray-200 '>
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
              
              <div>
                
                <button type='button' className='px-3 py-2 border border-gray-300 rounded-l-md'>
                  -
                </button>
                <input type='number' min='0' defaultValue='0' id='quantity' name='quantity' className='px-3 py-2 border-t border-b text-center border-gray-300 w-30'/>
                <button type='button'  className='px-3 py-2 border border-gray-300 rounded-r-md'>
                  +
                </button>
              </div>
              {/*Boton de eliminar  */}
              <div className='pl-3'>
                
                <button type='button' className='px-3 py-2 border border-gray-300 rounded-md '>
                  -
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
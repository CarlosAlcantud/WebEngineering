'use client';

import { useContext } from 'react';
import CartItemCounter from '@/components/CartItemCounter';
import { CartItemsContext } from '@/providers/CartItemsProvider';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function CartItemsList() {
  const { cartItems, updateCartItems } = useContext(CartItemsContext);

  //   Calcula el precio total del pedido
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.product.price,
    0
  );

  
  return (
    <>
      <div className='items-left flex flex-col'>
      <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
        My Shopping Cart
      </h3>

      {cartItems.length === 0 ? (
        <div className='rounded text-center'>
          <span className='rounded text-sm text-gray-400'>
            The cart is empty
          </span>
        </div>
      ) : (
        <>
          <table className='table-fixed w-full mt-4 border'>
            <thead className='text-left bg-gray-100 mb-4'>
              <tr className='divide-y'>
                <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20w-20/100 font-semibold '>PRODUCT NAME </th>
                <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10w-20/100 font-semibold hidden sm:table-cell text-center'>QUANTITY</th>
                <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20w-20/100 font-semibold hidden sm:table-cell md:hidden lg:table-cell text-center'>PRICE</th>
                <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-50w-20/100 font-semibold text-center'> TOTAL</th>
                
              </tr>
            </thead>
            <tbody className='divide-y'>
              {cartItems.map((cartItem) => (
                <tr
                  key={cartItem.product._id.toString()}
                  className=' bg-white'
                >
                  <td className='p-4 text-x sm:text-sm md:text-base lg:text-lg w-20/100'>
                    <Link href={`/products/${cartItem.product._id}`}>
                      {cartItem.product.name}
                    </Link>
                  </td>
                  <td className='flex justify-center space-x-2'>
                            <CartItemCounter
                              productId={cartItem.product._id}
                              // productId={item.product && item.product._id ? item.product._id.toString() : ''}

                            />
                  </td>
                  <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20/100 hidden sm:table-cell md:hidden lg:table-cell text-center'>
                    {
                    cartItem.product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
                    }
                  </td>
                  <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-50/100 text-center '>
                    {
                    (cartItem.qty * cartItem.product.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
                    }
                  </td>
                </tr>
              ))}
              <tr className='bg-white'>
                <td className='p-4 text-x sm:text-sm md:text-base lg:text-lg w-20/100'><strong>Total </strong></td>
                <td className = 'p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10/100 hidden sm:table-cell'> </td>
                <td className = 'p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10/100 hidden sm:table-cell'> </td>
                <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-1/4 text-center'>
                  <strong>{
                    totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
                  }</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='text-center mt-2'>
            <Link href='/checkout'>
              <button className='rounded bg-gray-800 px-4 py-2 text-white'>
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
    </>
  );
}

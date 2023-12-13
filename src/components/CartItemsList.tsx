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
          <table className='mb-4 w-full rounded'>
            <thead>
              <tr className='rounded bg-gray-200'>
                <th className='rounded py-2 text-left'> PRODUCT NAME </th>
                <th className='rounded py-2 text-left'> QUANTITY </th>
                <th className='rounded py-2 text-left'> PRICE </th>
                <th className='rounded py-2 text-left'> TOTAL </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <tr
                  key={cartItem.product._id.toString()}
                  className='rounded bg-white'
                >
                  <td className='lg:w-3/5'>
                    <Link href={`/products/${cartItem.product._id}`}>
                      {cartItem.product.name}
                    </Link>
                  </td>
                  <td className='flex items-center space-x-2'>
                            <CartItemCounter
                              productId={cartItem.product._id}
                              // productId={item.product && item.product._id ? item.product._id.toString() : ''}

                            />
                  </td>
                  <td>{cartItem.product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
                  <td>
                    {(cartItem.qty * cartItem.product.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mb-4 w-full rounded bg-gray-200 p-4'>
            <span className='text-lg font-bold'>Total:</span>
            <span className='ml-2 text-lg'>
              {totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          <div className='text-center'>
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

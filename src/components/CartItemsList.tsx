'use client';

import { useContext, useEffect} from 'react';
import CartItemCounter from '@/components/CartItemCounter';
import { CartItemsContext } from '@/providers/CartItemsProvider';
import Link from 'next/link';
import { useSession } from "next-auth/react";
export const dynamic = 'force-dynamic';

export default function CartItemsList() {
  
  const { data: session } = useSession({ required: true });
  const { cartItems, updateCartItems } = useContext(CartItemsContext);

  useEffect(() => {
    if (session) {
      const fetchData = async function () {
        const res = await fetch(`/api/users/${session.user._id}/cart`,
        {
          method: "GET"
        });
        const body = await res.json();
        updateCartItems(body.cartItems);
      };

      fetchData().catch(console.error);
    } else {
      updateCartItems([]);
    }
  }, [session,updateCartItems]);

  // Calculate total price
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

          <div className = "overflow-auto rounded-xl shadow-2xl">
          <table className='w-full '>
            <thead className='text-left bg-gray-100 border-b-2 border-gray-200 mb-4 divide-y'>
              <tr className='divide-y'>
                <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20w-20/100 font-semibold '>PRODUCT NAME </th>
                <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10w-20/100 font-semibold text-center'>QUANTITY</th>
                <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20w-20/100 font-semibold hidden sm:table-cell lg:table-cell text-center'>PRICE</th>
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
                  <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20/100 hidden sm:table-cell lg:table-cell text-center'>
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
                <td className = 'p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10/100 '> </td>
                <td className = 'p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10/100 hidden sm:table-cell'> </td>
                <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-1/4 text-center'>
                  <strong>{
                    totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
                  }</strong>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          <div className='text-center mt-4'>
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

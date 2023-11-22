import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { notFound, redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { CartItemsResponse, getCartItems, createOrder} from '@/lib/handlers';
import Link from 'next/link';
import Order from '@/models/Order';


export const dynamic = 'force-dynamic';

export default async function Checkout() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const cartItemsData: CartItemsResponse | null = await getCartItems(
    session.user._id
  );

  if (!cartItemsData) {
    notFound();
  }

  const calculateTotalPrice = () => {
    return cartItemsData.cartItems.reduce(
      (total, cartItem) => total + cartItem.qty * cartItem.product.price,
      0
    );
  };

  return (
    <div className='flex flex-col items-left'>
      <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
        Checkout
      </h3>

      {cartItemsData.cartItems.length === 0 ? (
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
              {cartItemsData.cartItems.map((cartItem) => (
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
                    <span className='text-gray rounded bg-white px-2 py-1'>
                      {' '}
                      {cartItem.qty}
                    </span>
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
              {calculateTotalPrice().toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>

          <form className= 'w-full max-w-md mb-8'>
            <div className='mb-4'>
              <label htmlFor='shippingAddress' className='block text-gray-700 text-sm font-bold mb-2'>
                Shipping Address:
              </label>
              <input
                type='text'
                id='shippingAddress'
                name='shippingAddress'
                className='w-full px-3 py-2 border rounded'
                required
              />
            </div>

            <div className='flex mb-4'>
              <div className='w-1/2 pr-2'>
                <label htmlFor='cardHolder' className='block text-gray-700 text-sm font-bold mb-2'>
                  Card Holder:
                </label>
                <input
                  type='text'
                  id='cardHolder'
                  name='cardHolder'
                  className='w-full px-3 py-2 border rounded'
                  required
                />
              </div>

              <div className='w-1/2 pl-2'>
                <label htmlFor='cardNumber' className='block text-gray-700 text-sm font-bold mb-2'>
                  Card Number:
                </label>
                <input
                  type='text'
                  id='cardNumber'
                  name='cardNumber'
                  className='w-full px-3 py-2 border rounded'
                  required
                />
              </div>
            </div>

            <div className='text-center'>
              {/* <button type='button' className='bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed' disabled> */}
              <button type='button' className='bg-gray-800 text-white px-4 py-2 rounded'
                 //onClick={handlePurchase} // Activar cuando tengamos la funcionalidad
              >  
                Purchase
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
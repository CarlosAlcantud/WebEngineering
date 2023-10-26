import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { notFound, redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { CartItemsResponse, getCartItems } from '@/lib/handlers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Cart() {
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

  return (
    <div className='flex flex-col'>
      <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
        My Shopping Cart
      </h3>
      {cartItemsData.cartItems.length === 0 ? (
        <div className='text-center'>
          <span className='text-sm text-gray-400'>The cart is empty</span>
        </div>
      ) : (
        <>
          {cartItemsData.cartItems.map((cartItem) => (
            <div key={cartItem.product._id.toString()}>
              <Link href={`/products/${cartItem.product._id}`}>
                {cartItem.product.name}
              </Link>
              <br />
              {cartItem.qty}
              <br />
              {cartItem.product.price.toFixed(2) + ' €'}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
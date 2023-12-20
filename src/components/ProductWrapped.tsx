'use client';

import { useContext, useEffect} from 'react';
import CartItemsCounter from '@/components/CartItemCounter';
import { CartItemsContext } from '@/providers/CartItemsProvider';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { getProduct } from '@/lib/handlers';

export const dynamic = 'force-dynamic';


interface ProductWrappedProps {
    productId: string;
}


export default function ProductWrapped({ productId }: ProductWrappedProps) {
  
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

  

  return (
    <>
        <div className='flex items-center justify-center mt-4'>
            <CartItemsCounter productId={productId}/>

        </div>
        
    </>
  );
}

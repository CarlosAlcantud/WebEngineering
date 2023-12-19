'use client';
import React, { useState } from 'react';
import { useContext, useEffect} from 'react';
import { CartItemsContext } from '@/providers/CartItemsProvider';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
export const dynamic = 'force-dynamic';

interface FormValues {
    address: string;
    cardHolder: string;
    cardNumber: string;
}


export default function CheckOut() {
    const router = useRouter();
    const { data: session } = useSession({ required: true });
    const { cartItems, updateCartItems } = useContext(CartItemsContext);
    const [error, setError] = useState<string>('');


    const [formValues, setFormValues] = useState<FormValues>({
        address: '',
        cardHolder: '',
        cardNumber: ''
      });
   
  
    // Calculate total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.qty * item.product.price,
      0
    );

    const handleSubmit = async function (
        event: React.FormEvent<HTMLFormElement>
      ) {
        event.preventDefault();
        if (!event.currentTarget.checkValidity()) {
          return false;
        }
        
        const res = await fetch(
            `/api/users/${session!.user._id}/orders/`,
              {
                  method: "POST",
                  body: JSON.stringify(
                     formValues
                  ),
              }
        );
        if (res.ok) {
          setError('');
          router.push('/profile'); // Push to the profile page. 
          router.refresh();
          toast.success('Your Order has been created.');
        } else {
          if (!res.ok) {
            setError(
              `Error Please try again.`
            );
          } else {
            setError(
              'An error occurred while processing your request. Please try again later.'
            );
          }
        }
        
    
      };

    return(
        <>
      <div className='items-left flex flex-col'>
        <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
            Checkout
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
                    <span className=''>
                        {' '}
                        {cartItem.qty}
                    </span>
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

          
        </>
        )}
      </div>
        <div className='mx-auto w-full max-w-sm bg-gray-100 p-6 rounded-3xl shadow-2xl mt-10'>
            <div className='mx-auto mt-10 w-full max-w-sm '>
                <form className='group space-y-6' onSubmit={handleSubmit} noValidate>
                    <div>
                        <label
                        htmlFor='ShipppingAddress'
                        className='block text-sm font-medium leading-6 text-gray-900'
                        >
                        Shipping Address:
                        </label>
                        <input
                        id='ShipppingAddress'
                        name='ShipppingAddress'
                        type='ShipppingAddress'
                        autoComplete='ShipppingAddress'
                        placeholder='via Roma 1, 00100 Roma'
                        required
                        className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
                        value={formValues.address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prevFormValues) => ({
                            ...prevFormValues,
                            address: e.target.value,
                            }))
                        }
                        />
                        <p className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                        Please provide a valid address.
                        </p>
                    </div>

                    <div>
                        <label
                        htmlFor='cardHolder'
                        className='block text-sm font-medium leading-6 text-gray-900'
                        >
                        Card Holder
                        </label>
                        <input
                        id='cardHolder'
                        name='cardHolder'
                        type='cardHolder'
                        autoComplete='current-cardHolder'
                        placeholder=' '
                        required
                        className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
                        value={formValues.cardHolder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prevFormValues) => ({
                            ...prevFormValues,
                            cardHolder: e.target.value,
                            }))
                        }
                        />
                        <p className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                        Please input the cardHolder.
                        </p>
                    </div>
                    <div>
                        <label
                        htmlFor='cardNumber'
                        className='block text-sm font-medium leading-6 text-gray-900'
                        >
                        Card Number
                        </label>
                        <input
                        id='cardNumber'
                        name='cardNumber'
                        type='cardNumber'
                        autoComplete='current-cardNumber'
                        placeholder=' '
                        required
                        className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
                        value={formValues.cardNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prevFormValues) => ({
                            ...prevFormValues,
                            cardNumber: e.target.value,
                            }))
                        }
                        />
                        <p className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                        Please input the cardNumber.
                        </p>
                    </div>

                    {error &&
                        <div className='mt-2 rounded-md border-0 bg-red-500 bg-opacity-30 px-3 py-1.5 ring-1 ring-inset ring-red-500'>
                        <p className='text-sm text-gray-900'>
                            {error}
                        </p>
                        </div>
                    }

                    <div className = ' flex justify-center mt-4'>
                    <button type='submit' className='flex justify-center rounded-md bg-gray-800 text-white px-4 py-2 rounded font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-invalid:pointer-events-none group-invalid:opacity-30 w-auto'
                    >  
                        Purchase
                    </button>
                    </div>
                </form>

            </div>
        </div>
      
        
        </>

    );
}



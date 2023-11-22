import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { notFound, redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { Types } from 'mongoose';
import { getOrder } from '@/lib/handlers';
import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Order({
  params,
}: {
  params: { orderId: string };
}) {

  const session: Session | null = await getServerSession(authOptions);
 
  
  if (!session) {
    redirect('/api/auth/signin');
  }

  if (!Types.ObjectId.isValid(params.orderId)) {
    notFound();
  }

  const order = await getOrder(session.user._id,params.orderId);

  let total = order.orderItems.map((orderItem) => orderItem.price * orderItem.qty).reduce((a, b) => a + b, 0);

  if (order === null) {
    notFound();
  }
  return (
    
     <div className='flex flex-col '  >
      <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
        Your Order Details, 
      </h3>

      <table className="w-full max-w-md">
        <tbody>
          <tr>
          <td className="pb-2 text-left text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '45px'}}>
            <strong>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-5 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              Order ID :
            </strong>
          </td>
            <td className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
              {order._id}
            </td>
          </tr>

          <tr>
            <td className="pb-2 text-left text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '45px'}}>
              <strong>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-5 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                Shipping address: </strong>
            </td>
            <td className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
              { order.address}
            </td>
          </tr>

          <tr>
            <td className="pb-2 text-left text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '45px'}}>
              <strong>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-5 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>

                Payment information: </strong>
            </td>
            <td className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
              { order.cardNumber +'(' + order.cardHolder +')'}
            </td>
          </tr>

          <tr>
            <td className="pb-2 text-left text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '45px'}}>
              <strong>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block mr-5">
                <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
              </svg>

                Date of purchase: </strong>
            </td>
            <td className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
              { 
              
                new Date(order.date).toLocaleString('en-US', 
                  { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                  }) 
                  
              }


            </td>
          </tr>


        </tbody>
      </table>


      <table className = "table-fixed w-full mt-8 border">
        <thead className='text-left bg-gray-100 mb-4'>
          <tr className='divide-y'>
            <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20w-20/100 font-semibold '>PRODUCT NAME </th>
            <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10w-20/100 font-semibold hidden sm:table-cell text-center'>QUANTITY</th>
            <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20w-20/100 font-semibold hidden sm:table-cell md:hidden lg:table-cell text-center'>PRICE</th>
            <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-50w-20/100 font-semibold text-center'> TOTAL</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody className='divide-y'>
          {order.orderItems.map((orderItem) => (
            <tr key={orderItem.product._id} className=' bg-white '>
              <td className='p-4 text-x sm:text-sm md:text-base lg:text-lg w-20/100'>
                <Link href={`/products/${orderItem.product._id}`}>
                    {orderItem.product.name}
                </Link>
               </td>
              <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10/100 hidden sm:table-cell text-center'>{orderItem.qty}</td>
              <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20/100 hidden sm:table-cell md:hidden lg:table-cell text-center'>
                {
                  parseFloat(orderItem.price).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
                }
              </td>
              <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-50/100 text-center '>
              {
                  parseFloat(orderItem.price * orderItem.qty).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
                  
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
              parseFloat(total).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
            }</strong>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
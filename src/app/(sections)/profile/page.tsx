import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { notFound, redirect } from 'next/navigation';
import { Session } from 'next-auth';
import Link from 'next/link';
// imports for order 

import {UserResponse, getUser, OrdersResponse, getOrders } from '@/lib/handlers';



export const dynamic = 'force-dynamic';


export default async function Profile() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  // get user info
  const user: UserResponse | null = await getUser(session.user._id);

  const data: OrdersResponse | null = await getOrders(session.user._id);
  // get order info 
  

  if (!user ) {
    notFound();
  }

  
  return (
    <div className='flex flex-col '  >
      <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
        Hola, { user.name }!
      </h3>

      <div className="overflow-auto w-full">
        <div className="flex items-left pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{ whiteSpace: 'nowrap' }}>
          <strong className='mr-4'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block mr-5">
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
            Full name:
          </strong>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl" style={{ whiteSpace: 'nowrap' }}>
            {user.name + ' ' + user.surname}
          </span>
        </div>

        <div className="flex items-right pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{ whiteSpace: 'nowrap' }}>
          <strong className='mr-12'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block mr-5">
              <path fillRule="evenodd" d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" clipRule="evenodd" />
            </svg>
            Email :  
          </strong>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl" style={{ whiteSpace: 'nowrap' }}>
            {user.email}
          </span>
        </div>

        <div className="flex items-right pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{ whiteSpace: 'nowrap' }}>
          <strong className='mr-7'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block mr-5">
              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
            </svg>
            Address:
          </strong>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl" style={{ whiteSpace: 'nowrap' }}>
            {user.address}
          </span>
        </div>

        <div className="flex items-right pb-2  text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '45px'}}>
          <strong className='mr-5'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block mr-5">
              <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>

            Birthdate: 
          </strong  >

          <span className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
            { user.birthdate.getUTCMonth() + 1+ '/' + user.birthdate.getUTCDate() + '/' + user.birthdate.getUTCFullYear() }
          </span>

        </div>
    </div>
 



     


      <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8' style = {{paddingTop: '50px'}}>
        Tus Orders: 
      </h3>


      
      <div className = "overflow-auto rounded-xl shadow-2xl">
        <table className = "w-full">
          <thead className='text-left bg-gray-50 border-b-2 border-gray-200'>
            <tr className=''>
              <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-2/5'>ORDER ID</th>
              <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-2/5 hidden sm:table-cell '>SHIPMENT ADDRESS</th>
              <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-1/10 hidden sm:hidden md:hidden lg:table-cell'>PAYMENT INFORMATION</th>
              <th className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-1/10 '></th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className='divide-y'>
            {data?.orders.map((order) => (
              <tr key={order._id} className=' bg-white '>
                <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-30/100 '>{order._id}</td>
                <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-40/100 hidden sm:table-cell'>{order.address}</td>
                <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-10/100 hidden sm:hidden md:hidden lg:table-cell'>
                  <div className='flex flex-col '>
                    <span>{order.cardHolder}</span>
                    <span className='text-sm text-gray-500'>{order.cardNumber}</span>
                    
                  </div>
                </td>
                <td className='p-4 text-xs sm:text-sm md:text-base lg:text-lg w-20/100 text-center'>
                <Link href={`/orders/${order!._id}/`} className = 'text-blue-500 hover:underline text-justify-center'>view details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    
    );
}
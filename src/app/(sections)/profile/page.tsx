import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { notFound, redirect } from 'next/navigation';
import { Session } from 'next-auth';

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

  // get order info 
  const data: OrdersResponse[] | null=  await getOrders(session.user._id);

  if (!user || !data ) {
    notFound();
  }


  return (
    <div className='flex flex-col '  >
      <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
        Hola, { user.name }!
      </h3>

      <table className="w-full max-w-md ">
        <tbody>
          <tr>
            <td className="pb-2 text-left text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '40 px'}}>
              <strong>Full name: </strong>
            </td>
            <td className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
              { user.name + ' ' + user.surname}
            </td>
          </tr>

          <tr>
            <td className="pb-2 text-left text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '40px'}}>
              <strong>Email: </strong>
            </td>
            <td className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
              { user.email }
            </td>
          </tr>

          <tr>
            <td className="pb-2 text-left text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '40px'}}>
              <strong>Address: </strong>
            </td>
            <td className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
              { user.address }
            </td>
          </tr>

          <tr>
            <td className="pb-2 text-left text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap',paddingRight: '40px'}}>
              <strong>Birthdate: </strong>
            </td>
            <td className="pb-2 text-sm sm:text-base md:text-lg lg:text-xl" style={{whiteSpace: 'nowrap'}}>
              { user.birthdate.getUTCMonth() + 1+ '/' + user.birthdate.getUTCDate() + '/' + user.birthdate.getUTCFullYear() }
            </td>
          </tr>


        </tbody>
      </table>


      <h3 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8' style = {{paddingTop: '50px'}}>
        Tus Orders: 
      </h3>


      
      <table>
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>SHIPMENT ADDRESS</th>
            <th>PAYMENT INFORMATION</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        
          
          
        
      </table>

      {/* <ul role="list" className="divide-y divide-gray-100"> 
        {data.map((order)=> (

          <li key ={order._id} className="py-4 flex">
            <div className="ml-3">
              
              <p className="text-sm text-gray-500">{order.address}</p>
              <p className="text-sm text-gray-500">{order.cardHolder}</p>
            </div>
          </li>


        ))}
      </ul> */}
     
    </div>
    
    );
}
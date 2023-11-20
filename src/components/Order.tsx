import { Order } from '@/models/Order';
import Link from 'next/link';


interface OrderProps {
  order: Order;
}

export default function OrderTile({ order }: OrderProps) {
  return (
    <Link href={`/orders/${order!._id}`} className='group'>
      
      {order._id?.toString()}
      
     </Link>
  );
}
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { notFound, redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { Types } from 'mongoose';
import { getProduct } from '@/lib/handlers';
import React from 'react';


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

  return (
    <div>
      Hola mundo 
    </div>
  );
}
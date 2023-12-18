'use client';

import { ReactNode } from 'react';
import { signOut } from "next-auth/react"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const navbarButtonClasses =
  'rounded-full p-2 text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white';

interface NavbarButtonProps {
  children: ReactNode;
}

export default function NavbarButton({ children }: NavbarButtonProps) {
  const router = useRouter();
 

  async function handleSignOut() {
          await signOut({redirect: false});
          router.push('/');
          router.refresh();
          toast.success('You have successfully been signed out.');
          
  }
  
  return (
      <button onClick={handleSignOut} className={navbarButtonClasses}>
      {children}
      </button>
  );
}
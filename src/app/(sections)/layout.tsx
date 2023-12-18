import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <ToastContainer position='top-center' toastClassName="rounded-toast"/>
      <Header />
      <main className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8'> 
        {children}
      </main>
      <Footer />
    </div>
  );
}
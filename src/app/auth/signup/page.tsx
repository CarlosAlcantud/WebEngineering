import SignUpForm from '@/components/SignUpForm';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div className='flex flex-col w-full h-screen items-center justify-center px-6 py-12 ' style={{
      backgroundImage: "url('https://wallpapers.com/images/hd/ultra-wide-4k-car-3lxbiug6ognbvkxm.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-100 mb-8 text-center'>PRESTIGE MOTORS</h1>
        <div className='mx-auto w-full max-w-sm bg-gray-100 p-6 rounded-3xl shadow-2xl '>
          <img
            className='mx-auto h-10 w-auto'
            src='/img/logo.svg'
            alt='GameShop logo'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create your account
          </h2>

          <div className='mx-auto mt-10 w-full max-w-sm '>
          <SignUpForm />

          
          </div>
        </div>
      </div>

      
    </div>
  );
}
export default function Header() {
  return (
    <header className='mx-auto w-full px-6 pb-16 pt-24 text-center sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32'
      style={{backgroundImage: 'url("https://wallpapers.com/images/hd/ultra-wide-4k-car-3lxbiug6ognbvkxm.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className='mx-auto max-w-2xl'>
        <h1 className='text-6xl font-bold text-green-100 sm:text-7xl lg:text-8xl'>
          Prestige Motors 
        </h1>
        <p className='mt-4 text-sm font-bold leading-8 text-green-50 sm:mt-6 sm:text-base lg:text-lg'>
          Buy your dream car from the palm of your hand 
        </p>
      </div>
    </header>
  );
}
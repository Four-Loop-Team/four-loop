import React from 'react';
import Image from 'next/image';

export default function App() {
  return (
    <div className='app'>
      <div className='logo'></div>
      <Image
        src='/android-chrome-192x192.png'
        width={500}
        height={500}
        alt='icon 1'
      />
      <Image
        src='/ui/images/android-chrome-512x512.png'
        width={500}
        height={500}
        alt='icon 2'
      />
    </div>
  );
}

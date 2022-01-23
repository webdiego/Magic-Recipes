import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="bg-black mt-12 py-18 w-full flex justify-center items-center ">
      <a className="my-4" href="https://github.com/webdiego">
        <Image src={'/GitHub.svg'} height="42" width="42" alt="GitHub" />
      </a>
    </div>
  );
}

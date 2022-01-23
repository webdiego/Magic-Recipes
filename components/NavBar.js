import React from 'react';
import Pizza from './Pizza';
import { useRouter } from 'next/router';

export default function NavBar({ route, route_2 }) {
  const router = useRouter();
  return (
    <div className="flex items-center flex-row justify-between w-full">
      <div>
        <button
          className="-rotate-45 font-bold text-base md:text-3xl self-center ml-5 "
          onClick={() => router.push(`/${route === 'home' ? '/' : route}`)}
        >
          {route}
        </button>
        <button
          className="-rotate-45 font-bold text-base md:text-3xl self-center ml-5 "
          onClick={() => router.push(`/${route_2}`)}
        >
          {route_2}
        </button>
      </div>
      <Pizza />
    </div>
  );
}

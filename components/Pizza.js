import { useState } from 'react';

export default function Pizza() {
  const [rotate, setRotate] = useState(false);
  const animation = () => {
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };
  return (
    <>
      <img
        onClick={() => {
          setRotate(true);
          animation();
        }}
        src={'/Pizza.svg'}
        className={`w-16 md:w-24 self-end mx-8 mt-4 ${
          rotate ? 'rotate-center' : null
        } cursor-pointer `}
      />
    </>
  );
}

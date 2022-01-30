// import Head from '../components/Head';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { gsap, Power3, Bounce } from 'gsap';
import { useRef, useEffect, useState } from 'react';

export default function Home({ recipes }) {
  const router = useRouter();
  const textRef = useRef();
  const herRef = useRef();
  const shadowRef = useRef();

  var tl = gsap.timeline();

  const [width, setWidth] = useState('');

  let resize;
  if (width > 768) {
    resize = '200px';
  } else if (width < 768) {
    resize = '100px';
  }
  
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, [width]);


  useEffect(() => {
    tl.to(textRef.current, {
      scale: 1.2,
      duration: 2,
      opacity: 1,
      y: 100,
      ease: Bounce.easeInOut,
    }).to(textRef.current, {
      scale: 1,
      duration: 2,
      opacity: 1,
      y: 0,
      ease: Power3.easeInOut,
    });

    tl.to(herRef.current, {
      opacity: 1,
    }).to(shadowRef.current, {
      opacity: 1,
    });

    tl.to(herRef.current, {
      duration: 2,
      y: 26,
      repeat: -1,
      yoyo: true,
    }).to(
      shadowRef.current,
      {
        duration: 2,
        width: resize,
        repeat: -1,
        yoyo: true,
      },
      '-=2'
    );
  }, [tl, resize]);

  return (
    <>
      {/* <Head /> */}
      <NavBar route="list" />
      <div className="flex items-center flex-col justify-center h-screen">
        <div className="flex items-center flex-col justify-center md:mt-12">
          <h1
            ref={textRef}
            className="font-black absolute top-48 md:top-28 z-10 text-[40px] md:text-[70px] lg:text-[100px] opacity-0 scale-0"
          >
            MAGIC RECIPES
          </h1>
          <img ref={herRef} src={'/Magic.svg'} className="w-2/3 lg:w-2/3 relative opacity-0" />
          <div className="h-36 ">
            <img ref={shadowRef} src={'/Shadow.svg'} className="w-10 mt-10  opacity-0" />
          </div>
        </div>

        <h1 className="font-bold mt-8 ">Latest spells adds</h1>
        <div className="flex flex-col justify-between items-center w-full max-w-2xl mt-2 mb-8 px-6 md:px-0">
          <div className="flex justify-between items-center w-full max-w-2xl mt-6  ">
            <p className="font-bold mb-4">Recipe name</p>
            <p className="font-bold mb-4 ">Created at</p>
          </div>
          {recipes.slice(0, 5).map((recipe, id) => {
            return (
              <div key={id} className="flex justify-between items-center w-full max-w-2xl mt-2 ">
                <h1 className="text-xs md:text-base">{recipe.title}</h1>
                <div className="flex">
                  <h1 className="text-xs md:text-base">
                    {new Date(recipe._createdAt).toUTCString().slice(0, 17)}
                  </h1>
                  <button
                    onClick={() => router.push(`/recipes/${recipe.slug.current}`)}
                    className="text-red-500 ml-5 text-xs md:text-base"
                  >
                    Go!░
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = encodeURIComponent(`*[ _type == "recipe" ]`);
  const url = `https://${process.env.API_KEY}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        recipes: [],
      },
    };
  } else {
    return {
      props: {
        recipes: result.result,
      },
    };
  }
};

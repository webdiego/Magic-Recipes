import Head from '../components/Head';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { gsap, Power3 } from 'gsap';
import { useRef, useEffect } from 'react';

export default function Home({ recipes }) {
  const router = useRouter();
  const textRef = useRef();
  const herRef = useRef();
  const shadowRef = useRef();
  useEffect(() => {
    gsap.timeline().to(textRef.current, {
      duration: 5,
      opacity: 1,
    });

    gsap
      .timeline({ repeat: -1 })
      .from(herRef.current, {
        duration: 4,
        y: 0,
      })
      .to(herRef.current, {
        duration: 4,
        y: 26,
        ease: Power3.ease,
      })
      .to(herRef.current, {
        duration: 4,
        y: 0,
        ease: Power3.ease,
      });
  });
  return (
    <>
      <Head />
      <NavBar route="list" />
      <div className="flex items-center flex-col justify-center h-screen">
        <div className="flex items-center flex-col justify-center md:mt-12">
          <h1
            ref={textRef}
            className="font-black absolute top-48 md:top-28 z-10 text-[40px] md:text-[70px] lg:text-[100px] opacity-0 "
          >
            MAGIC RECIPES
          </h1>
          <img src={'/Magic.svg'} className="w-1/2 lg:w-2/3 relative " />
          <img src={'/Shadow.svg'} className="animate-spin-slow w-16 md:w-auto" />
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

import { useState } from 'react';
// import styles from '../styles/Home.module.css';
import Head from '../components/Head';
import { useRouter } from 'next/router';

export default function Home({ recipes }) {
  const router = useRouter();
  const [rotate, setRotate] = useState(false);
  return (
    <>
      <Head />
      <div className="flex items-center flex-col ">
        <img
          onClick={() => setRotate(true)}
          src={'/pizza.svg'}
          className={`w-22 self-end mx-8 mt-4 ${rotate ? 'rotate-center' : null} `}
        />
        <h1 className="text-black font-black absolute top-40 z-10 font-big">MAGIC RECIPES</h1>
        <img src={'/Magic.svg'} className="w-full lg:w-1/2  relative" />
        {recipes.map((recipe, id) => {
          return (
            <div key={id}>
              <h1
                className="bg-red-200 text-red-600"
                onClick={() => router.push(`/recipes/${recipe.slug.current}`)}
              >
                {recipe.title}
              </h1>
            </div>
          );
        })}
        <h1 onClick={() => router.push(`/list`)}>list</h1>
      </div>
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

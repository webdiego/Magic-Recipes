import Head from '../components/Head';
import Pizza from '../components/Pizza';
import { useRouter } from 'next/router';

export default function Home({ recipes }) {
  const router = useRouter();

  return (
    <>
      <Head />
      <div className="flex items-center flex-col ">
        <Pizza />
        <h1 className="font-black absolute top-40 z-10 font-big">MAGIC RECIPES</h1>
        <img src={'/Magic.svg'} className="w-full lg:w-1/3  relative" />

        <h1 className="font-bold ">Latest spells adds</h1>
        <div className="flex justify-between w-full max-w-2xl">
          <div>
            <p className="font-bold mb-4">Recipe name</p>
            {recipes.map((recipe, id) => {
              return (
                <div key={id}>
                  <h1 className="">{recipe.title}</h1>
                </div>
              );
            })}
          </div>
          <div>
            <p className="font-bold mb-4 ">Created at</p>
            {recipes.map((recipe, id) => {
              return (
                <div key={id} className="flex">
                  <h1 className="">{new Date(recipe._createdAt).toUTCString().slice(0, 17)}</h1>
                  <button
                    onClick={() => router.push(`/recipes/${recipe.slug.current}`).toUTCString()}
                    className="text-red-500 ml-5"
                  >
                    Go!
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="-rotate-45 font-bold text-3xl mt-14 "
          onClick={() => router.push(`/list`)}
        >
          list
        </button>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = encodeURIComponent(`*[ _type == "recipe" ]`);
  const url = `https://${process.env.API_KEY}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  console.log(result);
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

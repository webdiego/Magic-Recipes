import { useRouter } from 'next/router';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
export default function Home({ recipes }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  console.log(search);
  return (
    <>
      <NavBar route="home" />
      <div className="flex items-center flex-col justify-start h-screen ">
        <div className="mt-4">
          <h1 className="font-black text-[50px] md:text-[70px] lg:text-[100px] ">ALL RECIPES</h1>
        </div>

        <div className="flex flex-col w-full max-w-2xl px-6 md:px-0">
          <div className="flex justify-between">
            <label className="font-black self-end">Search</label>
            <img src={'/Dog.svg'} className="w-24 md:w-44 " />
          </div>
          <input
            onChange={(e) => setSearch(e.currentTarget.value)}
            className="border-4 border-black w-full ring-0 pl-1 outline-none"
          />
        </div>

        <div className="flex flex-col justify-between items-center w-full max-w-2xl mt-6 px-6 md:px-0">
          <div className="flex justify-between items-center w-full max-w-2xl mt-6">
            <p className="font-bold mb-4">Recipe name</p>
            <p className="font-bold mb-4 ">Created at</p>
          </div>
          {recipes
            .filter((recipe) => {
              if (search == '') {
                return recipe;
              } else if (recipe.title.toLowerCase().includes(search.toLowerCase())) {
                return recipe;
              }
            })
            .map((recipe, id) => {
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

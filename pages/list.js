import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home({ recipes }) {
  const router = useRouter();
  return (
    <div >
      {recipes.map((recipe, id) => {
        return (
          <div key={id}>
            <h1 onClick={() => router.push(`/recipes/${recipe.slug.current}`)}>{recipe.title}</h1>
          </div>
        );
      })}
    </div>
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

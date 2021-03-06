import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function Recipe({ title, ingredients, preparation }) {
  let ingre = [];
  ingredients.map((ingredient) => ingre.push(ingredient.children[0].text));
  let prepa = [];
  preparation.map((p) => prepa.push(p.children[0].text));
  return (
    <>
      <NavBar route="home" route_2="list" />

      <div className="flex items-start flex-col justify-center  mx-8 mt-12 min-h-screen">
        <h1 className="text-4xl font-bold uppercase mb-8">{title}</h1>
        <div className="my-8 w-full">
          <h1 className="text-lg font-bold mb-4">INGREDIENTS</h1>
          <div className="flex w-full flex-col md:flex-row justify-between">
            <div className="flex flex-col max-w-2xl">
              {ingre.map((el, i) => {
                return (
                  <p className="mt-5 text-sm" key={i}>
                    - {el}
                  </p>
                );
              })}
            </div>

            <img src={'/Teacher.svg'} className="w-44 md:w-72  justify-self-start self-end" />
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-lg font-bold mb-4">PREPARATION</h1>
          {prepa.map((prep, i) => {
           
            return (
              <p className="mt-5 text-sm" key={i}>
                {prep}
              </p>
            );
          })}
        </div>
        <img src={'/Guarantee.svg'} className="w-20 md:w-32 my-12 self-center md:self-start" />
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  if (!pageSlug) {
    return {
      notFound: true,
    };
  }
  const query = encodeURIComponent(`*[_type == "recipe" && slug.current == "${pageSlug}"]`);
  const url = `https://${process.env.API_KEY}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  const recipe = result.result[0];
  if (!recipe) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        title: recipe.title,
        preparation: recipe.preparation,
        ingredients: recipe.ingredients,
      },
    };
  }
};

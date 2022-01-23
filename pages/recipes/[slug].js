import { useState, useEffect } from 'react';

export default function Recipe({ title, ingredients, preparation }) {
  return (
    <div>
      <h1>{title}</h1>
      {ingredients.map((ingredient, i) => {
        return <p key={i}> - {ingredient.children[0].text}</p>;
      })}
      {preparation.map((prep, i) => {
        return <p key={i}>{prep.children[0].text}</p>;
      })}
    </div>
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
  console.log(recipe);
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

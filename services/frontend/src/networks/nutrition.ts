export const fetchIngredients = async ({ query }: { query: string }) => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchRecipes = async ({ query }: { query: string }) => {
  try {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=94c8109f&app_key=9368a28ab0cd2aa9f4ecde91644867cf`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

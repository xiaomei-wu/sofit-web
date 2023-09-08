export const fetchDrinks = async ({
  prefix,
  category,
}: {
  prefix: string;
  category: string;
}) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${prefix}=${category}`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

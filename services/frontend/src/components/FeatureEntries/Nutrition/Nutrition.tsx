'use client';

import { fetchIngredients, fetchRecipes } from '@/networks';
import { capitalizeFirstLetter } from '@/utils';
import { useEffect, useState } from 'react';

import DateTimeInput from '@/components/ui/DateTimeInput/DateTimeInput';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import DataList from '../../shared/DataList/DataList';
import IngrediensForm from './IngrediensForm/IngrediensForm';
import RecipesForm from './RecipesForm/RecipesForm';

export default function Nutrition() {
  const [state, setState] = useState({
    food: {
      startTime: new Date()
        .toLocaleTimeString('en-US', { hour12: false })
        .substring(0, 5),
      name: '',
      portion: '',
      eatenPortion: '',
      imgUrl: '',
      ingredients: [],
    },
    ingredients: [],
    recipes: [],
    editing: false,
    tempIngredient: {},
    tempStartTime: '',
    handleShowSingle: true,
    query: '',
    recipeQuery: '',
    date: new Date().toISOString().split('T')[0], // You can set the date based on your requirements.
    errors: {},
  });

  const getIngredientsFromEdamam = async () => {
    const response = await fetchIngredients({ query: '' });

    setState(prevState => ({
      ...prevState,
      ingredients: response.hints.map(hint => hint.food),
    }));
  };

  const getRecipeFromEdamam = async () => {
    const response = await fetchRecipes({ query: '' });
    setState(prevState => ({
      ...prevState,
      recipes: response?.hits?.map(hit => ({
        ...hit.recipe,
        healthLabels: hit.recipe.healthLabels[0],
      })),
    }));
  };

  useEffect(() => {
    getIngredientsFromEdamam();
    getRecipeFromEdamam();
  }, []);

  const apiFormat = apiObj => {
    return {
      name: apiObj.text,
      servingAmount: apiObj.weight,
      imgUrl: apiObj.image,
      servingSize: 'g',
    };
  };

  const handleClick = event => {
    event.preventDefault();

    const key = event.target.getAttribute('data-key');
    setState(prevState => {
      const clickedIngr = prevState.ingredients.find(
        ingredient => ingredient.foodId === key,
      );
      return {
        ...prevState,
        tempIngredient: {
          ...prevState.tempIngredient,
          name: clickedIngr.label,
          brand: clickedIngr.brand,
          category: clickedIngr.category,
          imgUrl: clickedIngr.image,
        },
      };
    });
  };

  const handleClickRecipe = event => {
    event.preventDefault();
    const key = event.target.getAttribute('data-key');

    setState(prevState => {
      const clickedRecipe = prevState.recipes.find(
        recipe => recipe.uri === key,
      );
      return {
        ...prevState,
        food: {
          ...prevState.food,
          name: clickedRecipe.label,
          portion: clickedRecipe.yield,
          category: clickedRecipe.healthLabels,
          imgUrl: clickedRecipe.image,
          ingredients: clickedRecipe.ingredients.map(apiFormat),
        },
      };
    });
  };

  const handleSearch = event => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(value);
    console.log(name);

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));

    console.log(state);
  };

  const handleQuery = async event => {
    event?.preventDefault();

    const response = await fetchIngredients({ query: state.query });

    setState(prevState => ({
      ...prevState,
      query: state.query,
      ingredients: response.hints.map(hint => hint.food),
    }));
  };

  const handleRecipeQuery = async event => {
    event?.preventDefault();
    const response = await fetchRecipes({ query: state.query });

    setState(prevState => ({
      ...prevState,
      recipeQuery: state.query,
      recipes: response.hits.map(hit => ({
        ...hit.recipe,
        healthLabels: hit.recipe.healthLabels[0],
      })),
    }));
  };

  const toggleRecipe = () => {
    setState(prevState => ({
      ...prevState,
      handleShowSingle: false,
    }));
  };

  const toggleSingle = () => {
    setState(prevState => ({
      ...prevState,
      handleShowSingle: true,
    }));
  };

  const handleRecipeValidation = () => {
    const food = state.food;
    const errors = {};
    let formIsValid = true;

    if (!food.name) {
      formIsValid = false;
      errors.name = 'Food name cannot be empty';
    }
    if (food.eatenPortion === '') {
      formIsValid = false;
      errors.eatenPortion = 'Your portion cannot be empty';
    }

    setState(prevState => ({
      ...prevState,
      errors: errors,
    }));

    return formIsValid;
  };

  const handleSingleValidation = () => {
    const tempIngredient = state.tempIngredient;
    const errors = {};
    let formIsValid = true;

    if (!tempIngredient.name) {
      formIsValid = false;
      errors.name = 'Food name cannot be empty';
    }
    if (!tempIngredient.servingAmount) {
      formIsValid = false;
      errors.servingAmount = 'Serving amount cannot be empty';
    }
    if (!tempIngredient.servingSize) {
      formIsValid = false;
      errors.servingSize = 'Serving size cannot be empty';
    }

    setState(prevState => ({
      ...prevState,
      errors: errors,
    }));

    return formIsValid;
  };

  const handleSingleSubmit = event => {
    event.preventDefault();
    if (handleSingleValidation()) {
      setState(
        prevState => ({
          ...prevState,
          food: {
            ...prevState.food,
            ingredients: [prevState.tempIngredient],
            name: capitalizeFirstLetter(prevState.tempIngredient.name),
            portion: 1,
            eatenPortion: 1,
            startTime: prevState.tempStartTime,
            imgUrl: prevState.tempIngredient.imgUrl,
          },
        }),
        () => {
          const payload = {
            user: {},
            date: state.date,
            food: state.food,
          };
          // TODO
          // axios
          //   .post(`/api/ingredients/user/${user}/day/${state.date}`, payload)
          //   .then(() => {
          //     router.push('/dashboard');
          //   })
          //   .catch(err => console.log(err));
        },
      );
    } else {
      router.push('/add/Foods');
    }
  };

  const handleRecipeSubmit = event => {
    event.preventDefault();
    if (handleRecipeValidation()) {
      setState(
        prevState => ({
          ...prevState,
          food: {
            ...prevState.food,
            name: capitalizeFirstLetter(prevState.food.name),
            startTime: prevState.tempStartTime,
            imgUrl: prevState.food.imgUrl,
          },
        }),
        () => {
          const payload = {
            user: {},
            date: state.date,
            food: state.food,
          };
          // TODO
          // axios
          //   .post(`/api/ingredients/user/${user}/day/${state.date}`, payload)
          //   .then(() => {
          //     router.push('/dashboard');
          //   })
          //   .catch(err => console.log(err));
        },
      );
    }
  };

  let dataComponent, formComponent, searchField, title;
  if (state.handleShowSingle) {
    dataComponent = (
      <DataList
        data={state.ingredients}
        dataKey="foodId"
        handleClick={handleClick}
        heading="label"
        img="image"
        key="foodId"
        subtitle="category"
      />
    );
    formComponent = (
      <IngrediensForm
        {...state}
        handleChange={handleSearch}
        handleSubmit={handleSingleSubmit}
      />
    );
    searchField = (
      <SearchInput
        handleQuery={handleQuery}
        handleSearch={handleSearch}
        placeholder="Ingredients in your dish..."
        query={state.query || ''}
      />
    );
    title = <h4>Suggested Foods</h4>;
  } else {
    dataComponent = (
      <DataList
        data={state.recipes}
        dataKey="uri"
        handleClick={handleClickRecipe}
        heading="label"
        img="image"
        key="uri"
        subtitle="healthLabels"
      />
    );
    formComponent = (
      <RecipesForm
        {...state}
        handleChange={handleSearch}
        handleSubmit={handleRecipeSubmit}
      />
    );
    searchField = (
      <SearchInput
        handleQuery={handleRecipeQuery}
        handleSearch={handleSearch}
        placeholder="Find your recipe..."
        query={state.recipeQuery}
      />
    );
    title = <h4>Suggested Recipes</h4>;
  }

  return (
    <div>
      <div className="pt3 pb6">
        <DateTimeInput
          date={state.date}
          handleChange={handleSearch}
          startTime={state.tempStartTime}
        />
        <button
          className="f6 link dim br4 ph2 pv1 mb2 dib white bg-dark-blue"
          onClick={toggleSingle}
        >
          + Add a single food
        </button>
        <button
          className="f6 link dim br4 ph3 pv1 mb2 dib white bg-dark-blue"
          onClick={toggleRecipe}
        >
          + Add a recipe
        </button>
        <div>
          {title}
          {searchField}
          {dataComponent}
          {formComponent}
        </div>
      </div>
    </div>
  );
}

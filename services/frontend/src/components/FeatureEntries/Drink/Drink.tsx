'use client';

import DataList from '@/components/shared/DataList/DataList';
import DateTimeInput from '@/components/ui/DateTimeInput/DateTimeInput';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import Select from '@/components/ui/Select/Select';
import { fetchDrinks } from '@/networks';
import React, { useEffect, useState } from 'react';
import DrinkItemForm from './DrinkItemForm/DrinkItemForm';

interface AddDrinksProps {
  user: { _id: string };
  location: {
    state?: {
      day?: string;
      element?: {
        startTime: string;
        drinks: {
          name: string;
          category: string;
          servingAmount: string;
          servingSize: string;
        }[];
      };
    };
  };
  history: { push: (path: string) => void };
}

const Drinks: React.FC<AddDrinksProps> = props => {
  const [state, setState] = useState({
    user: {},
    date: new Date().toISOString().split('T')[0],
    startTime: new Date()
      .toLocaleTimeString('en-US', { hour12: false })
      .substring(0, 5),
    name: '',
    category: '',
    servingAmount: '',
    servingSize: '',
    imgUrl: '',
    drinks: [],
    query: '',
    apiCategory: '',
    editing: false,
    errors: {},
  });

  // API
  useEffect(() => {
    getInitialDrinks();
  }, []);

  const getInitialDrinks = async () => {
    const response = await fetchDrinks({ prefix: 'a', category: 'Alcoholic' });
    setState({
      ...state,
      drinks: response.drinks,
    });
  };

  const handleQuery = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const response = await fetchDrinks({ prefix: 's', category: state.query });
    setState({
      ...state,
      query: event.currentTarget.value,
      drinks: response.drinks,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const key = event.currentTarget.getAttribute('data-key');
    const clickedDrink = state.drinks.find(drink => drink.idDrink === key);
    setState({
      ...state,
      name: clickedDrink.strDrink,
      imgUrl: clickedDrink.strDrinkThumb,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSelectCategory = async (
    event: React.FormEvent<HTMLSelectElement>,
  ) => {
    event.preventDefault();
    let prefix;
    const apiCategory = event.currentTarget.value;
    if (apiCategory === 'Alcoholic' || apiCategory === 'Non_Alcoholic') {
      prefix = 'a';
    }
    if (apiCategory === 'Ordinary_Drink' || apiCategory === 'Cocktail') {
      prefix = 'c';
    }

    const response = await fetchDrinks({ prefix, category: apiCategory });

    setState({
      ...state,
      apiCategory: apiCategory,
      drinks: response.drinks,
    });
  };

  const handleDrinkValidation = () => {
    const name = state.name;
    const servingAmount = state.servingAmount;
    const errors: { [key: string]: string } = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors.name = 'Drink name cannot be empty';
    }
    if (!servingAmount) {
      formIsValid = false;
      errors.servingAmount = 'Serving amount cannot be empty';
    }
    setState({ ...state, errors: errors });
    return formIsValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleDrinkValidation()) {
      const payload = state;
      // axios
      //   .post(`/api/drinks/user/${props.user._id}/day/${state.date}`, payload)
      //   .then(() => {
      //     setState({
      //       date: '',
      //       startTime: '',
      //       servingAmount: '',
      //       servingSize: '',
      //       name: '',
      //       category: '',
      //     });
      //     props.history.push('/dashboard');
      //   })
      //   .catch(err => console.log(err));
    }
  };

  const options = ['Alcoholic', 'Non_Alcoholic', 'Ordinary_Drink', 'Cocktail'];

  return (
    <div>
      <div className="pt3 pb6">
        <DateTimeInput
          date={state.date}
          handleChange={handleChange}
          startTime={state.startTime}
        />
        <Select
          handleChange={handleSelectCategory}
          id="apiCategory"
          name="apiCategory"
          options={options}
          title="Category: "
          value={state.apiCategory}
        />
        <SearchInput
          handleQuery={handleQuery}
          handleSearch={handleChange}
          placeholder="Margarita..."
          query={state.query}
        />
        <DataList
          data={state.drinks}
          dataKey="idDrink"
          handleClick={handleClick}
          heading="strDrink"
          img="strDrinkThumb"
          key="idDrink"
        />
        <h3 className="f6 db">Add a drink</h3>
        <DrinkItemForm
          {...state}
          handleChange={handleChange}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Drinks;

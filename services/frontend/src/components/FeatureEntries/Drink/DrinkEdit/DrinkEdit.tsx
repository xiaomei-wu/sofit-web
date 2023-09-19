import DateTimeInput from '@/components/ui/DateTimeInput/DateTimeInput';
import React, { useState } from 'react';
import DrinkItemForm from '../DrinkForm/DrinkForm';

interface DrinkEditProps {
  user: { _id: string };
  location: {
    state: {
      day?: string;
      element: {
        _id: string;
        startTime: string;
        name: string;
        category: string;
        servingAmount: string;
        servingSize: string;
      };
    };
  };
  history: { push: (path: string) => void };
}

const DrinkEdit: React.FC<DrinkEditProps> = props => {
  const [state, setState] = useState({
    user: props.user,
    date: props.location.state?.day || new Date().toISOString().split('T')[0],
    startTime:
      props.location.state?.element.startTime ||
      new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0, 5),
    drink: props.location.state.element,
    drinkId: props.location.state.element._id,
    name: props.location.state.element.name,
    category: props.location.state.element.category,
    servingAmount: props.location.state.element.servingAmount,
    servingSize: props.location.state.element.servingSize,
    drinks: [],
    query: '',
    apiCategory: '',
    editing: true,
    errors: {},
  });

  const handleDeleteDrink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    const drinkId = event.currentTarget.getAttribute('data-key');
    // axios
    //   .put(
    //     `/api/drinks/user/${state.user._id}/day/${state.date}/${drinkId}/delete`,
    //   )
    //   .then(res => {
    //     props.history.push('/dashboard');
    //   })
    //   .catch(err => console.log(err));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({
      ...state,
      [name]: value,
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

  const handleEditDrink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleDrinkValidation()) {
      setState(prevState => ({
        ...prevState,
        drink: {
          ...prevState.drink,
          name: prevState.name,
          category: prevState.category,
          servingAmount: prevState.servingAmount,
          servingSize: prevState.servingSize,
          startTime: prevState.startTime,
        },
      }));
      const payload = {
        user: state.user,
        date: state.date,
        drink: state.drink,
      };
      axios
        .put(
          `/api/drinks/user/${state.user._id}/day/${state.date}/${state.drinkId}/edit`,
          payload,
        )
        .then(() => {
          props.history.push('/dashboard');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <div className="pt3 pb6">
        <DateTimeInput
          date={state.date}
          handleChange={handleChange}
          startTime={state.startTime}
        />
        <div className="mw6 center">
          <h3 className="f6 db">What did you drink?</h3>
          <DrinkItemForm
            {...state}
            handleChange={handleChange}
            handleDeleteDrink={handleDeleteDrink}
            handleEditDrink={handleEditDrink}
          />
        </div>
      </div>
    </div>
  );
};

export default DrinkEdit;

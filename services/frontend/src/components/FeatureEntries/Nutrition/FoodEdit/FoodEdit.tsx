import DateTimeInput from '@/components/ui/DateTimeInput/DateTimeInput';
import { useEffect, useState } from 'react';
import RecipesForm from '../RecipesForm/RecipesForm';

const FoodEdit = props => {
  const [food, setFood] = useState(props.location.state.element);
  const [editing, setEditing] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFood(props.location.state.element);
    setEditing(true);
  }, [props.location.state.element]);

  const editIngrSave = event => {
    event.preventDefault();
    if (handleSingleValidation()) {
      setFood(prevState => {
        const updatedIngredients = [...prevState.ingredients];
        updatedIngredients.splice(tempIngIdx, 1, tempIngredient);
        return {
          ...prevState,
          ingredients: updatedIngredients,
        };
      });
      setEditing(false);
      setTempIngredient({
        name: '',
        brand: '',
        category: '',
        servingAmount: '',
        servingSize: '',
      });
    }
  };

  const addNewIngrSave = event => {
    event.preventDefault();
    if (handleSingleValidation()) {
      setFood(prevState => ({
        ...prevState,
        ingredients: [...prevState.ingredients, tempIngredient],
      }));
      setAdd(false);
    }
  };

  const handleRecipeValidation = () => {
    let formIsValid = true;
    const errors = {};

    if (!food.name) {
      formIsValid = false;
      errors.name = 'Food name cannot be empty';
    }
    if (food.eatenPortion === '') {
      formIsValid = false;
      errors.eatenPortion = 'Your portion cannot be empty';
    }

    setErrors(errors);
    return formIsValid;
  };

  const editRecipeSubmit = event => {
    event.preventDefault();
    if (handleRecipeValidation()) {
      const payload = {
        user: user,
        date: date,
        food: food,
      };

      // axios
      //   .put(
      //     `/api/ingredients/user/${user._id}/day/${date}/${food._id}/edit`,
      //     payload,
      //   )
      //   .then(() => {
      //     props.history.push('/dashboard');
      //   })
      //   .catch(err => console.log(err));
    }
  };

  const handleDeleteIngredient = event => {
    event?.preventDefault();
    const ingIdx = event.target.getAttribute('data-key');
    setFood(prevState => {
      const updatedIngredients = [...prevState.ingredients];
      updatedIngredients.splice(ingIdx, 1);
      return {
        ...prevState,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleDeleteFood = event => {
    event?.preventDefault();
    const foodId = event.target.getAttribute('data-key');
    // DELETE
    // axios
    //   .put(`/api/ingredients/user/${user._id}/day/${date}/${foodId}/delete`)
    //   .then(() => {
    //     props.history.push('/dashboard');
    //   })
    //   .catch(err => console.log(err));
  };

  const toggleAddIngr = event => {
    event?.preventDefault();
    setAdd(true);
    setTempIngredient({
      name: '',
      brand: '',
      category: '',
      servingAmount: '',
      servingSize: '',
    });
  };

  const toggleEditIngr = event => {
    event?.preventDefault();
    const ingIdx = event.target.getAttribute('data-key');
    setEdit(true);
    setTempIngredient({ ...food.ingredients[ingIdx] });
    setTempIngIdx(ingIdx);
  };

  return (
    <div>
      <div className="pb5">
        <DateTimeInput
          date={date}
          handleChange={handleChange}
          startTime={tempStartTime}
        />
        <div className="mw6 center">
          <RecipesForm
            addNewIngrSave={addNewIngrSave}
            editing={editing}
            editIngrSave={editIngrSave}
            editRecipeSubmit={editRecipeSubmit}
            errors={errors}
            food={food}
            handleChange={handleChange}
            handleDeleteFood={handleDeleteFood}
            handleDeleteIngredient={handleDeleteIngredient}
            toggleAddIngr={toggleAddIngr}
            toggleEditIngr={toggleEditIngr}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodEdit;

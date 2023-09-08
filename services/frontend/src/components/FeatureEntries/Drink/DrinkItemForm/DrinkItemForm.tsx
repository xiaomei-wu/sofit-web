import Input from '@/components/ui/Input/Input';
import Select from '@/components/ui/Select/Select';
import React from 'react';

interface DrinkIngrFormProps {
  name: string;
  errors: { [key: string]: string };
  servingAmount: string;
  servingSize: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleDeleteDrink: (event: React.MouseEvent<HTMLButtonElement>) => void;
  drink: { _id: string };
  editing: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleEditDrink: (event: React.FormEvent<HTMLFormElement>) => void;
}

const DrinkItemForm: React.FC<DrinkIngrFormProps> = props => {
  const options = ['Alcoholic', 'Non-Alcoholic', 'Ordinary drink', 'Cocktail'];

  return (
    <div>
      <form>
        <Input
          handleChange={props.handleChange}
          id="name"
          name="name"
          placeholder="Water"
          title="Name: "
          type="text"
          value={props.name}
        />
        <span style={{ color: 'red' }}>{props.errors.name}</span>
        <Select
          handleChange={props.handleChange}
          id="category"
          name="category"
          options={options}
          title="Category: "
        />

        <Input
          handleChange={props.handleChange}
          id="servingAmount"
          min="0"
          name="servingAmount"
          placeholder="300"
          title="QT: "
          type="number"
          value={props.servingAmount}
        />
        <span style={{ color: 'red' }}>{props.errors.servingAmount}</span>
        <Input
          handleChange={props.handleChange}
          id="servingSize"
          name="servingSize"
          placeholder="ml"
          title="Unit: "
          type="text"
          value={props.servingSize}
        />
      </form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <div>
          {props.editing && (
            <button
              className="f6 link dim br-pill ba bw1 ph2 mt3 pv2 mb4 mr2 dib dark-blue"
              data-key={props.drink._id}
              onClick={props.handleDeleteDrink}
            >
              ✖️ Delete Drink
            </button>
          )}
        </div>
        <form
          onSubmit={props.editing ? props.handleEditDrink : props.handleSubmit}
        >
          <button
            className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue ma3"
            type="submit"
          >
            {' '}
            Save Drinks
          </button>
        </form>
      </div>
    </div>
  );
};

export default DrinkItemForm;

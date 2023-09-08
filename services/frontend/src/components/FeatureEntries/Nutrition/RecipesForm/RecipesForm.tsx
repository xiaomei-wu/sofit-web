import Input from '@/components/ui/Input/Input';
import { capitalizeFirstLetter } from '@/utils';
import IngrediensForm from '../IngrediensForm/IngrediensForm';

export default function RecipesForm(props) {
  let editInterface = null;
  if (props.edit === true) {
    editInterface = (
      <IngrediensForm
        {...props}
        handleChange={props.handleChange}
        handleSubmit={props.handleSingleSubmit}
      />
    );
  }

  let addInterface = null;
  if (props.add === true) {
    addInterface = (
      <IngrediensForm
        {...props}
        addNewIngr={props.addNewIngr}
        handleChange={props.handleChange}
        handleEdit={props.handleEdit}
        handleSubmit={props.handleAddSubmit}
      />
    );
  }

  return (
    <div>
      {props.editing ? (
        <h3 className="f5 db">What did you eat? </h3>
      ) : (
        <h3 className="f5 db"> Add a recipe </h3>
      )}

      <form
        onSubmit={props.editing ? props.editRecipeSubmit : props.handleSubmit}
      >
        <Input
          handleChange={props.handleChange}
          id="recipeName"
          name="recipeName"
          title={props.editing ? 'Food Name: ' : 'Recipe Name: '}
          type="text"
          value={capitalizeFirstLetter(props.food.name)}
        />
        <span style={{ color: 'red' }}>{props.errors.name}</span>
        <Input
          handleChange={props.handleChange}
          id="portion"
          min="0"
          name="portion"
          title="Yield"
          type="number"
          value={props.food.portion}
        />
        <Input
          handleChange={props.handleChange}
          id="eatenPortion"
          min="0"
          name="eatenPortion"
          title="Your Portion"
          type="number"
          value={props.food.eatenPortion}
        />
        <span style={{ color: 'red' }}>{props.errors.eatenPortion}</span>
      </form>

      <div style={{ padding: '20px 0 5px 0' }}>
        {props.food.ingredients.map((ingr, index) => {
          return (
            <div key={ingr._id}>
              <button
                className="f7 link dim br2 ph1 pv1 mb2 pa4 mr2 dib white bg-dark-green"
                data-key={index}
                key={ingr._id}
                onClick={props.editing ? props.toggleEditIngr : () => {}}
              >
                {ingr.name}
              </button>
              {props.editing && (
                <button
                  className="f6 link dim br4 ph2 pv1 mb2 dib white bg-dark-pink"
                  data-key={index}
                  onClick={props.handleDeleteIngredient}
                >
                  {' '}
                  ✖️{' '}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {props.editing && (
        <button
          className="f7 link dim br4 ba ph2 pv1 mb3 dib dark-green"
          onClick={props.toggleAddIngr}
        >
          {' '}
          ➕ Add a new ingredient
        </button>
      )}
      {editInterface}
      {addInterface}
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
              className="f6 link dim br-pill ba bw1 ph2 pv2 mb4 mr3 dib dark-blue"
              data-key={props.food._id}
              onClick={props.handleDeleteFood}
            >
              ✖️ Delete Food
            </button>
          )}
        </div>
        <form
          onSubmit={props.editing ? props.editRecipeSubmit : props.handleSubmit}
        >
          <button className="f6 link dim br-pill ph4 pv2 mb2 dib white bg-dark-blue">
            Save all
          </button>
        </form>
      </div>
    </div>
  );
}

import Input from '@/components/ui/Input/Input';
import { capitalizeFirstLetter } from '@/utils';

export default function IngrediensForm({
  handleChange,
  tempIngredient,
  errors,
  editing,
  add,
  addNewIngrSave,
  handleSubmit,
}) {
  return (
    <div>
      <h3 className="f6 db">Custom single ingredient</h3>
      <div>
        <form>
          <div className="custom-ingredient">
            <Input
              handleChange={handleChange}
              id="name"
              name="name"
              placeholder="e.g. Apple"
              title="Name: "
              type="text"
              value={capitalizeFirstLetter(tempIngredient.name)}
            />
            <span style={{ color: 'red' }}>{errors.name}</span>
            <Input
              handleChange={handleChange}
              id="category"
              name="brand"
              placeholder="e.g. Edeka"
              title="Brand: "
              type="text"
              value={tempIngredient.brand}
            />
            <Input
              handleChange={handleChange}
              id="category"
              name="category"
              placeholder="e.g. Foods"
              title="Category: "
              type="text"
              value={tempIngredient.category}
            />
            <Input
              handleChange={handleChange}
              id="servingAmount"
              min="0"
              name="servingAmount"
              placeholder="e.g. 3"
              title="QT: "
              type="number"
              value={tempIngredient.servingAmount}
            />
            <span style={{ color: 'red' }}>{errors.servingAmount}</span>
            <Input
              handleChange={handleChange}
              id="servingSize"
              name="servingSize"
              placeholder="e.g. piece"
              title="Unit: "
              type="text"
              value={tempIngredient.servingSize}
            />
          </div>
        </form>
        {editing && add ? (
          <button
            className="f7 link dim br4 ba ph2 pv1 mb4 dib dark-green mr2"
            onClick={addNewIngrSave}
          >
            {' '}
            ✔️ Save Ingredient
          </button>
        ) : editing && edit ? (
          <button
            className="f7 link dim br4 ba ph2 pv1 mb4 dib dark-green mr2"
            onClick={editIngrSave}
          >
            {' '}
            ✔️ Save Ingredient
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            <button
              className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue ma3"
              type="submit"
            >
              {' '}
              Save Ingredient
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

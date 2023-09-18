'use client';

import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import FoodForm from '../FoodForm/FoodForm';
import RecipesForm from '../RecipesForm/RecipesForm';
import styles from './ModalContent.module.css';

export default function ModalContent({
  closeModal,
  selectedFood,
  selectedRecipe,
  selectedRecord,
}) {
  const [showRecipe, setShowRecipe] = useState(false);

  const onChange = (checked: boolean) => {
    setShowRecipe(checked);
  };

  useEffect(() => {
    console.log(selectedRecord);

    if (selectedRecipe) {
      return setShowRecipe(true);
    }
    if (selectedFood) {
      return setShowRecipe(false);
    }
    if (selectedRecord) {
      if (selectedRecord.food) {
        return setShowRecipe(false);
      }
      if (selectedRecord.recipe) {
        return setShowRecipe(true);
      }
    }
  }, []);

  return (
    <div>
      <div className={styles.switchbar}>
        <span>Is it a recipe?</span>
        <Switch
          checked={showRecipe}
          onChange={onChange}
          disabled={selectedRecord}
        />
      </div>
      {showRecipe ? (
        <RecipesForm
          closeModal={closeModal}
          selectedRecipe={selectedRecipe || selectedRecord?.recipe}
          selectedRecord={selectedRecord}
          isEditMode={selectedRecord}
        />
      ) : (
        <FoodForm
          closeModal={closeModal}
          selectedFood={selectedFood || selectedRecord?.food}
          selectedRecord={selectedRecord}
          isEditMode={selectedRecord}
        />
      )}
    </div>
  );
}

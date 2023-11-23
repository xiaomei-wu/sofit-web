'use client';

import { Food, FoodRecord, Recipe } from '@/types/food';
import { useEffect, useState } from 'react';
import FoodForm from '../FoodForm/FoodForm';
import RecipesForm from '../RecipesForm/RecipesForm';
import styles from './ModalContent.module.css';

const { Switch } = dynamic(() => import('antd'), {
  loading: <p>Loading...</p>,
  ssr: false
});

type ModalContentType = {
  closeModal: () => void;
  selectedFood: Food | null;
  selectedRecipe: Recipe | null;
  selectedRecord: FoodRecord | null;
};

export default function ModalContent({
  closeModal,
  selectedFood,
  selectedRecipe,
  selectedRecord
}: ModalContentType) {
  const [showRecipe, setShowRecipe] = useState(false);

  const onChange = (checked: boolean) => {
    setShowRecipe(checked);
  };

  useEffect(() => {
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
          disabled={!!selectedRecord}
        />
      </div>
      {showRecipe ? (
        <RecipesForm
          closeModal={closeModal}
          selectedRecipe={selectedRecipe || selectedRecord?.recipe}
          selectedRecord={selectedRecord}
          isEditMode={!!selectedRecord}
        />
      ) : (
        <FoodForm
          closeModal={closeModal}
          selectedFood={selectedFood || selectedRecord?.food}
          selectedRecord={selectedRecord}
          isEditMode={!!selectedRecord}
        />
      )}
    </div>
  );
}

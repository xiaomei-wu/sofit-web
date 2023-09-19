'use client';

import {
  createFood,
  createRecipe,
  fetchEdamamFood,
  fetchEdamamRecipes,
  FoodCategory,
  getFoodRecordsByDate
} from '@/networks';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './Nutrition.module.css';

import CarouselCard from '@/components/shared/CarouselCard/CarouselCard';
import { responsive } from '@/utils';
import { Button, Input, Modal, Tag } from 'antd';
import DataList from '../../shared/DataList/DataList';
import ModalContent from './ModalContent/ModalContent';

export default function Nutrition() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentRecord, setRecentRecord] = useState([]);
  const [foodSearchResults, setFoodSearchResults] = useState([]);
  const [recipeSearchResults, setRecipeSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchFoodRecord = async () => {
      const response = await getFoodRecordsByDate(new Date().toISOString());

      console.log(response, 'response');

      setRecentRecord(response);
    };

    fetchFoodRecord();
  }, []);

  const mapCategory = (category: string) => {
    if (category === 'Packaged foods') return FoodCategory.PACKAGED_FOODS;
    return FoodCategory.GENERIC_FOODS;
  };

  const searchFood = async value => {
    const response = await fetchEdamamFood(value);

    const foodResults = [];

    console.log(response, 'response');

    for (const hint of response.hints) {
      const edamamFood = hint.food;

      const createFoodDto = {
        name: edamamFood.label,
        brand: edamamFood.knownAs,
        imgUrl: edamamFood.image,
        category: mapCategory(edamamFood.category),
        nutrients: {
          enerc_Kcal: Math.round(edamamFood.nutrients.ENERC_KCAL),
          procnt_g: Math.round(edamamFood.nutrients.PROCNT),
          fat_g: Math.round(edamamFood.nutrients.FAT),
          chocdf_g: Math.round(edamamFood.nutrients.CHOCDF),
          sugar_g: Math.round(edamamFood.nutrients.SUGAR),
          fibt_g: Math.round(edamamFood.nutrients.FIBTG),
        },
      };

      const createdFood = await createFood(createFoodDto);
      foodResults.push(createdFood);
    }
    setFoodSearchResults(foodResults);
  };

  const searchRecipe = async value => {
    const response = await fetchEdamamRecipes(value);
    const recipeResults = [];
    for (const hit of response.hits) {
      const edamamRecipe = hit.recipe;

      const createRecipeDto = {
        name: edamamRecipe.label,
        imgUrl: edamamRecipe.image,
        source: edamamRecipe.source,
        yield: edamamRecipe.yield,
        dietLabels: edamamRecipe.dietLabels.map(item => ({
          label: item,
        })),
        healthLabels: edamamRecipe.healthLabels.map(item => ({
          label: item,
        })),
        cautions: edamamRecipe.cautions.map(item => ({
          label: item,
        })),
        ingredients: edamamRecipe.ingredients.map(ingredient => ({
          text: ingredient.text,
          food: ingredient.food,
          quantity: ingredient.quantity,
          measure: ingredient.measure,
          weight: ingredient.weight,
        })),
        calories: Math.round(edamamRecipe.calories),
        mealType: edamamRecipe.mealType.map(item => ({
          label: item,
        })),
        dishType: edamamRecipe.dishType.map(item => ({
          label: item,
        })),
        nutrients: {
          enerc_Kcal: Math.round(
            edamamRecipe.totalNutrients.ENERC_KCAL.quantity,
          ),
          procnt_g: Math.round(edamamRecipe.totalNutrients.PROCNT.quantity),
          fat_g: Math.round(edamamRecipe.totalNutrients.FAT.quantity),
          chocdf_g: Math.round(edamamRecipe.totalNutrients.CHOCDF.quantity),
          sugar_g: Math.round(edamamRecipe.totalNutrients.SUGAR.quantity),
          fibt_g: Math.round(edamamRecipe.totalNutrients.FIBTG.quantity),
        },
      };

      const createdRecipe = await createRecipe(createRecipeDto);
      recipeResults.push(createdRecipe);
    }

    setRecipeSearchResults(recipeResults);
  };

  const onSearch = async value => {
    await searchFood(value);
    await searchRecipe(value);
  };

  console.log(recentRecord);

  return (
    <div>
      <div>
        <div className={styles.searchbar}>
          <Input.Search
            placeholder="Search food or recipes..."
            onSearch={onSearch}
            style={{ width: 300 }}
          />

          <div className={styles.rightbar}>
            <Button type="primary" onClick={showModal}>
              Not found? Add it here
            </Button>
          </div>
        </div>

        <div>
          {foodSearchResults.length > 0 && (
            <>
              <h4>Food</h4>
              <Carousel responsive={responsive}>
                {foodSearchResults.map(item => (
                  <div key={item.uuid}>
                    <CarouselCard
                      imgUrl={item.imgUrl || '/food.png'}
                      title={item.name}
                      emphasis={`${item.nutrients[0].enerc_Kcal} Kcal`}
                      onClick={() => {
                        setSelectedFood(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <p>Protein {item.nutrients[0].procnt_g} g</p>
                      <p>Fat {item.nutrients[0].fat_g} g</p>
                      <p>Carb {item.nutrients[0].chocdf_g} g</p>
                    </CarouselCard>
                  </div>
                ))}
              </Carousel>
            </>
          )}

          {recipeSearchResults.length > 0 && (
            <>
              <h4>Recipes</h4>
              <Carousel responsive={responsive}>
                {recipeSearchResults.map(item => (
                  <div key={item.uuid}>
                    <CarouselCard
                      imgUrl={item.imgUrl || '/food.png'}
                      title={item.name}
                      subtitle={`Yield: ${item.yield}`}
                      emphasis={`${Math.round(
                        item.calories / item.yield,
                      )} kcal/yield`}
                      onClick={() => {
                        setSelectedRecipe(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <div>
                        {item.dietLabels
                          .map(item => item.label)
                          .slice(0, 3)
                          .map(label => (
                            <Tag color="blue" key={label}>
                              {label}
                            </Tag>
                          ))}
                      </div>
                      <div>
                        {item.healthLabels
                          .map(item => item.label)
                          .slice(0, 3)
                          .map(label => (
                            <Tag color={'green'} key={label}>
                              {label}
                            </Tag>
                          ))}
                      </div>

                      <div>
                        {item.cuisineType
                          .map(item => item.label)
                          .slice(0, 3)
                          .map(label => (
                            <Tag color="gold" key={label}>
                              {label}
                            </Tag>
                          ))}
                      </div>
                    </CarouselCard>
                  </div>
                ))}
              </Carousel>
            </>
          )}
          <h4>{recentRecord.length > 0 ? 'Today' : 'Today no data yet'}</h4>
          <DataList
            data={recentRecord}
            setSelectedRecord={setSelectedRecord}
            setIsModalOpen={setIsModalOpen}
          />
          <>
            <Modal
              title={null}
              open={isModalOpen}
              footer={null}
              onCancel={closeModal}
              destroyOnClose
            >
              <ModalContent
                closeModal={closeModal}
                selectedFood={selectedFood}
                selectedRecipe={selectedRecipe}
                selectedRecord={selectedRecord}
              />
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
}

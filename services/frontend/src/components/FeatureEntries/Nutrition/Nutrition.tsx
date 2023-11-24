'use client';

import {
  createFood,
  createRecipe,
  CreateRecipeDto,
  fetchEdamamFood,
  fetchEdamamRecipes,
  FoodCategory,
  RecipeResponse
} from '@/networks';
import { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import styles from './Nutrition.module.css';

import CarouselCard from '@/components/shared/CarouselCard/CarouselCard';
import DataList from '@/components/shared/DataList/DataList';
import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { useGetAllFoodRecord } from '@/hooks';
import { Food, FoodRecord, Recipe } from '@/types/food';
import { responsive } from '@/utils';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Tag from 'antd/lib/tag';
import Carousel from 'react-multi-carousel';
import ModalContent from './ModalContent/ModalContent';

export default function Nutrition() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodSearchResults, setFoodSearchResults] = useState<Food[]>([]);
  const [recipeSearchResults, setRecipeSearchResults] = useState<
    RecipeResponse[]
  >([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<FoodRecord | null>(null);

  const { data: recentRecord, isLoading } = useGetAllFoodRecord();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const mapCategory = (category: string) => {
    if (category === 'Packaged foods') return FoodCategory.PACKAGED_FOODS;
    return FoodCategory.GENERIC_FOODS;
  };

  const searchFood = async (value: string) => {
    const response = await fetchEdamamFood(value);
    const foodResults = [];

    for (const hint of response?.hints || []) {
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
          fibt_g: Math.round(edamamFood.nutrients.FIBTG)
        }
      };

      const createdFood = await createFood(createFoodDto);
      if (createdFood) {
        foodResults.push(createdFood);
      }
    }
    setFoodSearchResults(foodResults);
  };

  const searchRecipe = async (value: string) => {
    const response = await fetchEdamamRecipes(value);
    const recipeResults = [];
    for (const hit of response?.hits || []) {
      const edamamRecipe = hit.recipe;

      const createRecipeDto: CreateRecipeDto = {
        name: edamamRecipe.label,
        imgUrl: edamamRecipe.image,
        source: edamamRecipe.source,
        yield: edamamRecipe.yield,
        dietLabels: edamamRecipe.dietLabels.map(item => ({
          label: item
        })),
        healthLabels: edamamRecipe.healthLabels.map(item => ({
          label: item
        })),
        cautions: edamamRecipe.cautions.map(item => ({
          label: item
        })),
        ingredients: edamamRecipe.ingredients.map(ingredient => ({
          text: ingredient.text,
          food: ingredient.food,
          quantity: ingredient.quantity,
          measure: ingredient.measure,
          weight: ingredient.weight
        })),

        calories: Math.round(edamamRecipe.calories),
        mealType: edamamRecipe.mealType.map(item => ({
          label: item
        })),
        dishType: edamamRecipe.dishType.map(item => ({
          label: item
        })),
        nutrients: {
          enerc_Kcal: Math.round(
            edamamRecipe.totalNutrients.ENERC_KCAL.quantity
          ),
          procnt_g: Math.round(edamamRecipe.totalNutrients.PROCNT.quantity),
          fat_g: Math.round(edamamRecipe.totalNutrients.FAT.quantity),
          chocdf_g: Math.round(edamamRecipe.totalNutrients.CHOCDF.quantity),
          sugar_g: Math.round(edamamRecipe.totalNutrients.SUGAR.quantity),
          fibt_g: Math.round(edamamRecipe.totalNutrients.FIBTG.quantity)
        }
      };

      const createdRecipe = await createRecipe(createRecipeDto);
      if (createdRecipe) {
        recipeResults.push(createdRecipe);
      }
    }

    setRecipeSearchResults(recipeResults);
  };

  const onSearch = async (value: string) => {
    await searchFood(value);
    await searchRecipe(value);
  };

  const onClickAdd = () => {
    setSelectedFood(null);
    setSelectedRecipe(null);
    setSelectedRecord(null);
    showModal();
  };

  if (isLoading) return null;

  return (
    <div>
      <div>
        <div className={styles.searchbar}>
          <Input.Search
            placeholder="Search food or recipes..."
            onSearch={onSearch}
          />

          <div className={styles.rightbar}>
            <PrimaryButton onClick={onClickAdd}>
              Not found? Add it here
            </PrimaryButton>
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
                      emphasis={`${item.nutrients?.[0].enerc_Kcal} Kcal`}
                      onClick={() => {
                        setSelectedFood(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className={styles.tags}>
                        <Tag color="blue" key={'protein'}>
                          Protein {item.nutrients?.[0].procnt_g} g
                        </Tag>
                        <Tag color={'green'} key={'fat'}>
                          Fat {item.nutrients?.[0].fat_g} g
                        </Tag>
                        <Tag color="gold" key={'carb'}>
                          Carb {item.nutrients?.[0].chocdf_g} g
                        </Tag>
                      </div>
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
                        item.calories / item.yield
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
          <h4>
            {recentRecord && recentRecord?.length > 0
              ? 'Last 7 days'
              : 'No data yet'}
          </h4>
          <div className={styles.datalist}>
            {recentRecord?.map((item, index) => (
              <div key={index}>
                <DataList
                  item={item}
                  setSelectedRecord={setSelectedRecord}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            ))}
          </div>

          <>
            <Modal
              title={null}
              open={isModalOpen}
              footer={null}
              onCancel={() => {
                setSelectedFood(null);
                setSelectedRecipe(null);
                closeModal();
              }}
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

'use client';

import CarouselCard from '@/components/shared/CarouselCard/CarouselCard';
import EmptyView from '@/components/shared/EmptyView/EmptyView';
import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { useGetDrinks } from '@/hooks';
import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DrinkCategory, DrinkSearchPrefix } from './Drink.helper';
import styles from './Drink.module.css';
import DrinkForm from './DrinkForm/DrinkForm';
import DrinkList from './DrinkList/DrinkList';

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
  const [prefix, setPrefix] = useState(DrinkSearchPrefix.A);
  const [category, setCategory] = useState(DrinkCategory.ALCOHOLIC);
  const { data: drinks, isLoading, isFetching } = useGetDrinks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [seachResult, setSearchResult] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickAddButton = () => {
    setSelectedRecord(null);
    setSelectedDrink(null);
    showModal();
  };

  return (
    <div>
      <div className={styles.buttonWrapper}>
        <Input.Search />
        <PrimaryButton onClick={onClickAddButton}>Add drink</PrimaryButton>

        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          destroyOnClose
        >
          <DrinkForm
            closeModal={closeModal}
            selectedRecord={selectedRecord}
            selectedDrink={selectedDrink || selectedRecord}
            isEditMode={!!selectedRecord}
          />
        </Modal>
      </div>
      <div>
        {seachResult?.length > 0 && (
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
      </div>
      {drinks ? (
        <DrinkList
          drinks={drinks}
          setSelectedRecord={setSelectedRecord}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <EmptyView image={'/drinking.svg'} />
      )}
    </div>
  );
};

export default Drinks;

'use client';

import CarouselCard from '@/components/shared/CarouselCard/CarouselCard';
import EmptyView from '@/components/shared/EmptyView/EmptyView';
import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { useGetDrinks } from '@/hooks';
import { searchDrinks } from '@/networks';
import { responsive } from '@/utils';
import { Input, Modal, Tag } from 'antd';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './Drink.module.css';
import DrinkForm from './DrinkForm/DrinkForm';
import DrinkList from './DrinkList/DrinkList';

interface AddDrinksProps {}

const Drinks: React.FC<AddDrinksProps> = () => {
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

  const onSearch = async values => {
    try {
      const response = await searchDrinks({ query: values });
      setSearchResult(response.drinks);
    } catch (error) {
      throw new Error('Failed to fetch search results');
    }
  };

  return (
    <div>
      <div className={styles.buttonWrapper}>
        <Input.Search onSearch={onSearch} placeholder="Martini..." />
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
            <h4>Results</h4>
            <Carousel responsive={responsive}>
              {seachResult.map(item => (
                <div key={item.idDrink}>
                  <CarouselCard
                    imgUrl={'/cocktail.png'}
                    title={item.strDrink}
                    onClick={() => {
                      setSelectedDrink({
                        name: item.strDrink,
                        imgUrl: item.strDrinkThumb,
                        category: item.strCategory,
                      });
                      setIsModalOpen(true);
                    }}
                    // subtitle={item.strCategory}
                  >
                    <Tag color={'cyan'}>{item.strCategory}</Tag>
                  </CarouselCard>
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>
      {drinks ? (
        <div>
          <h4>{drinks.length} Drink</h4>
          <DrinkList
            drinks={drinks}
            setSelectedRecord={setSelectedRecord}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      ) : (
        <EmptyView image={'/drinking.svg'} />
      )}
    </div>
  );
};

export default Drinks;

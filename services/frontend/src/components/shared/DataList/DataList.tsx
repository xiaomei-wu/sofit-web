'use client';

import EdamamBadgeIcon from '@/assets/icons/edamam-badge.svg';
import {
  useDeleteFoodRecord,
  useGetNutritionDataFromEdamam,
  useUpdateNutritionData
} from '@/hooks';
import {
  createFoodRecord,
  createRecipeRecord,
  getFullRecipeNutritionAnalysis
} from '@/networks';
import { Drawer, message } from 'antd';
import React, { useEffect, useState } from 'react';
import InfoCard from '../InfoCard/InfoCard';
import styles from './DataList.module.css';
import NutritionTable from './NutritionTable/NutritionTable';

interface DataListProps {
  item: any;
  selectedRecord: any;
  setSelectedRecord: () => void;
  setIsModalOpen: () => void;
}

const Title = () => {
  return (
    <div className={styles.title}>
      <div>Nutrition Facts</div>
      <EdamamBadgeIcon width={160} height={30} />
    </div>
  );
};

const DataList: React.FC<DataListProps> = ({
  item,
  setSelectedRecord,
  setIsModalOpen,
}) => {
  const { mutateAsync: deleteFoodRecord } = useDeleteFoodRecord();
  const { mutateAsync: updateNutritionData } = useUpdateNutritionData();
  const [open, setOpen] = useState(false);

  const recipeIngredientsTexts = item.recipe?.ingredients?.map(
    ingredient => ingredient.text,
  );

  const recipeAnalysisBody = {
    title: item.recipe?.name,
    ingr: recipeIngredientsTexts,
    url: '',
    summary: '',
    yield: item.servingAmount,
    time: '',
    img: '',
    prep: '',
  };

  const nutritionQuery = item.food
    ? `${item.servingAmount} ${item.servingSize} ${item.food.name}`
    : '';

  const { data: nutritionAnalysisFromEdamam } = useGetNutritionDataFromEdamam({
    enabled: open && !item.nutritionData,
    query: nutritionQuery,
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDelete = async () => {
    try {
      await deleteFoodRecord(item.uuid);
      message.success('Deleted successfully');
    } catch (error) {
      message.error(error);
    }
  };

  const onAdd = async () => {
    if (item.food) {
      await createFoodRecord({ ...item, date: dayjs(), startTime: dayjs() });
    } else {
      await createRecipeRecord({ ...item, date: dayjs(), startTime: dayjs() });
    }
  };

  const saveNutritionData = async () => {
    if (item.nutritionData) return;

    if (nutritionAnalysisFromEdamam) {
      await updateNutritionData({
        foodRecordId: item.uuid,
        data: nutritionAnalysisFromEdamam,
      });
    }
  };

  const fetchAndSaveRecipeAnaysis = async () => {
    if (item.nutritionData) {
      return;
    }
    if (item.recipe && !item.nutritionData) {
      const response = await getFullRecipeNutritionAnalysis(recipeAnalysisBody);

      if (response) {
        await updateNutritionData({
          foodRecordId: item.uuid,
          data: response,
        });
      }
    }
  };

  useEffect(() => {
    if (item.food) {
      saveNutritionData();
    }
    fetchAndSaveRecipeAnaysis();
  }, []);

  const onClickBanner = () => {
    showDrawer();
  };

  return (
    <div>
      <InfoCard
        icon={item.food ? '/carrot.png' : '/bibimbap.png'}
        title={item.name || item.food?.name || item.recipe?.name}
        subtitle={item.date.split('T')[0]}
        addIcon={'/plus.png'}
        editIcon={'/pen.png'}
        deleteIcon={'/delete.png'}
        onAdd={onAdd}
        onDelete={onDelete}
        onEdit={() => {
          setSelectedRecord(item);
          setIsModalOpen(true);
        }}
        onClickBanner={onClickBanner}
        nutrientsBadge={item.nutritionData ? '/nutrients-badge.png' : null}
      />
      <Drawer
        title={<Title />}
        placement="bottom"
        onClose={onClose}
        open={open}
        height={'80%'}
      >
        {item.nutritionData && (
          <NutritionTable nutritionData={item.nutritionData} />
        )}
      </Drawer>
    </div>
  );
};

export default DataList;

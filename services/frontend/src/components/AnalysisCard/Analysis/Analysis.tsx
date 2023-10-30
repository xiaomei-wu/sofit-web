import { useGetHistories } from '@/hooks/useHistories';
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import 'chartkick/chart.js';
import { Scatter } from 'react-chartjs-2';
import styles from './Analysis.module.css';

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const Analysis = () => {
  const { data: histories, isLoading } = useGetHistories();

  if (isLoading) return null;

  const foodData = histories?.food?.map(record => {
    const { food, recipe, nutritionData } = record;
    return {
      x: nutritionData?.totalNutrients.FE || 0,
      y:
        nutritionData?.calories ||
        Math.round(recipe?.calories / recipe?.yield) ||
        food?.nutrients[0]?.enerc_Kcal ||
        0,
    };
  });

  const drinkData = histories?.drink?.map(record => {
    return {
      x: record.servingAmount ? 1 : 0,
      y: record.servingAmount,
    };
  });

  const sleepData = histories?.sleep?.map(record => {
    return {
      x: record.durationMinutes > 420 ? 1 : 0,
      y: record.durationMinutes,
    };
  });

  const symptomData = histories?.symptom?.map(record => {
    return {
      x: record.name ? 1 : 0,
      y: record.durationMinutes,
    };
  });

  const data = {
    datasets: [
      {
        label: 'Food',
        data: foodData,
        backgroundColor: '#C4F1B1',
      },
      {
        label: 'Drink',
        data: drinkData,
        backgroundColor: '#4085F4',
      },
      {
        label: 'Sleep',
        data: sleepData,
        backgroundColor: '#C455F3',
      },
      {
        label: 'Symptom',
        data: symptomData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <Scatter options={options} data={data} className={styles.canvas} />
      </div>
    </div>
  );
};

export default Analysis;
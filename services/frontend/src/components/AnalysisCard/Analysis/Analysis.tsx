import { useGetHistories } from '@/hooks/useHistories';
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import 'chartkick/chart.js';
import dynamic from 'next/dynamic';
import styles from './Analysis.module.css';

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const DynamicScatter = dynamic(() => import('react-chartjs-2'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Analysis() {
  const { data: histories, isLoading } = useGetHistories();

  if (isLoading) return null;

  const foodData = histories?.food?.map((record: FoodRecord) => {
    const { food, recipe, nutritionData } = record;
    return {
      //@ts-ignore nutritionData
      x: nutritionData?.totalNutrients.FE || 0,
      y:
        nutritionData?.calories ||
        //@ts-ignore nutritionData
        Math.round(recipe?.calories / recipe?.yield) ||
        //@ts-ignore nutritionData
        food?.nutrients[0]?.enerc_Kcal ||
        0
    };
  });

  const drinkData = histories?.drink?.map((record: Drink) => {
    return {
      x: record.servingAmount ? 1 : 0,
      y: record.servingAmount
    };
  });

  const sleepData = histories?.sleep?.map((record: Sleep) => {
    return {
      x: record.durationMinutes > 420 ? 1 : 0,
      y: record.durationMinutes
    };
  });

  const symptomData = histories?.symptom?.map((record: Symptom) => {
    return {
      x: record.name ? 1 : 0,
      y: record.durationMinutes
    };
  });

  const data = {
    datasets: [
      {
        label: 'Food',
        data: foodData,
        backgroundColor: '#C4F1B1'
      },
      {
        label: 'Drink',
        data: drinkData,
        backgroundColor: '#4085F4'
      },
      {
        label: 'Sleep',
        data: sleepData,
        backgroundColor: '#C455F3'
      },
      {
        label: 'Symptom',
        data: symptomData,
        backgroundColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <DynamicScatter
          options={options}
          data={data}
          className={styles.canvas}
        />
      </div>
    </div>
  );
}

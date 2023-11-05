import { Tag } from 'antd';
import styles from './NutritionTable.module.css';

export default function NutritionTable({
  nutritionData
}: {
  nutritionData: Record<string, any>;
}) {
  const {
    calories,
    cautions,
    dietLabels,
    totalDaily,
    totalWeight,
    healthLabels,
    totalNutrients,
    totalNutrientsKCal
  } = nutritionData;

  type NutrientValue = {
    label: string;
    quantity: number;
    unit: string;
  };

  const totalDailyValues: NutrientValue[] = Object.values(totalDaily);
  const totalNutrientsValues: NutrientValue[] = Object.values(totalNutrients);
  const totalNutrientsKcalValues: NutrientValue[] =
    Object.values(totalNutrientsKCal);

  return (
    <div>
      <div className={styles.grid}>
        <div>
          <h4>Calories per serving:</h4>
          {calories} calories
        </div>
        <div>
          <h4>Dietary restrictions:</h4>
          {dietLabels.map((label: string) => (
            <Tag key={label} color="green">
              {label}
            </Tag>
          ))}
        </div>
        <div>
          <h4>Cautions:</h4>
          {cautions.map((label: string) => (
            <Tag key={label} color="red">
              {label}
            </Tag>
          ))}
        </div>

        <div>
          <h4>Health Labels:</h4>
          {healthLabels.map((label: string) => (
            <Tag key={label} color="blue">
              {label}
            </Tag>
          ))}
        </div>
      </div>
      <div className={styles.grid}>
        <div>
          <h4>Nutrients</h4>
          <div className={styles.valueTable}>
            {totalNutrientsKcalValues.map(dailyValue => (
              <div key={dailyValue.label} className={styles.flexRow}>
                <div>{dailyValue.label}</div>
                <div>
                  {`${dailyValue.quantity.toFixed(0)}` +
                    ' ' +
                    `${dailyValue.unit}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div>
          <h4>Daily value:</h4>
          <div className={styles.valueTable}>
            {totalDailyValues.map(dailyValue => (
              <div key={dailyValue.label} className={styles.flexRow}>
                <div>{dailyValue.label}</div>
                <div>
                  {`${dailyValue.quantity.toFixed(0)}` +
                    ' ' +
                    `${dailyValue.unit}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4>Servings ({totalWeight.toFixed(0)} g)</h4>

          <div className={styles.valueTable}>
            {totalNutrientsValues.map(dailyValue => (
              <div key={dailyValue.label} className={styles.flexRow}>
                <div>{dailyValue.label}</div>
                <div>
                  {`${dailyValue.quantity.toFixed(0)}` +
                    ' ' +
                    `${dailyValue.unit}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

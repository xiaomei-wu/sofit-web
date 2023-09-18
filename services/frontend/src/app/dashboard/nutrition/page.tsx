import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Nutrition from '@/components/FeatureEntries/Nutrition/Nutrition';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';
import styles from './page.module.css';

export default function NutritionCard() {
  return (
    <DashboardLayout>
      <DetailsCard
        icon="/nutrition.png"
        title="Nutrition"
        className={styles.detailsCard}
      >
        <Nutrition />
      </DetailsCard>
    </DashboardLayout>
  );
}

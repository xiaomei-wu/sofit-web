import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Nutrition from '@/components/FeatureEntries/Nutrition/Nutrition';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';

export default function NutritionCard() {
  return (
    <DashboardLayout>
      <DetailsCard icon="/nutrition.png" title="Nutrition">
        <Nutrition />
      </DetailsCard>
    </DashboardLayout>
  );
}

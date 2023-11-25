import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Nutrition from '@/components/FeatureEntries/Nutrition/Nutrition';

export default function NutritionCard() {
  return (
    <DetailsCard icon="/nutrition.png" title="Nutrition">
      <Nutrition />
    </DetailsCard>
  );
}

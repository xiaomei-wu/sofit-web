import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Drinks from '@/components/FeatureEntries/Drink/Drink';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';

export default function DrinkCard() {
  return (
    <DashboardLayout>
      <DetailsCard icon="/drink.png" title="Drink">
        <Drinks />
      </DetailsCard>
    </DashboardLayout>
  );
}

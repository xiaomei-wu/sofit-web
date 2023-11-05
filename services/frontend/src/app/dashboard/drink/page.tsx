import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Drinks from '@/components/FeatureEntries/Drink/Drink';

export default function DrinkCard() {
  return (
    <DetailsCard icon="/drink.png" title="Drink">
      <Drinks />
    </DetailsCard>
  );
}

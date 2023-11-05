import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Energy from '@/components/FeatureEntries/Energy/Energy';

export default function EnergyCard() {
  return (
    <DetailsCard icon="/fire.png" title="Energy">
      <Energy />
    </DetailsCard>
  );
}

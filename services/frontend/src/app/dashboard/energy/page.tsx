import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Energy from '@/components/FeatureEntries/Energy/Energy';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';

export default function EnergyCard() {
  return (
    <DashboardLayout>
      <DetailsCard icon="/fire.png" title="Energy">
        <Energy />
      </DetailsCard>
    </DashboardLayout>
  );
}

import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Sleep from '@/components/FeatureEntries/Sleep/Sleep';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';

export default function SleepCard() {
  return (
    <DashboardLayout>
      <DetailsCard icon="/sleep.png" title="Sleep">
        <Sleep />
      </DetailsCard>
    </DashboardLayout>
  );
}

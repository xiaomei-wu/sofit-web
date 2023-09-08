import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Symptomes from '@/components/FeatureEntries/Symptomes/Symptomes';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';

export default function SymptomesCard() {
  return (
    <DashboardLayout>
      <DetailsCard icon="/tongue.png" title="Symptomes">
        <Symptomes />
      </DetailsCard>
    </DashboardLayout>
  );
}

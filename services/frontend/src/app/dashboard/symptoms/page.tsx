import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Symptom from '@/components/FeatureEntries/Symptom/Symptom';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';

export default function SymptomesCard() {
  return (
    <DashboardLayout>
      <DetailsCard icon="/tongue.png" title="Symptoms">
        <Symptom />
      </DetailsCard>
    </DashboardLayout>
  );
}

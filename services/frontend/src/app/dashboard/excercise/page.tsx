import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Excercise from '@/components/FeatureEntries/Excercise/Excercise';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';

export default function ExcerciseCard() {
  return (
    <DashboardLayout>
      <DetailsCard icon="/fire.png" title="Exercise">
        <Excercise />
      </DetailsCard>
    </DashboardLayout>
  );
}

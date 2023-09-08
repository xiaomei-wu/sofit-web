import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Exercise from '@/components/FeatureEntries/Exercise/Excercise';
import DashboardLayout from '@/components/ui/DashboardLayout/DashboardLayout';

export default function ExcerciseCard() {
  return (
    <DashboardLayout>
      <DetailsCard icon="/fire.png" title="Exercise">
        <Exercise />
      </DetailsCard>
    </DashboardLayout>
  );
}

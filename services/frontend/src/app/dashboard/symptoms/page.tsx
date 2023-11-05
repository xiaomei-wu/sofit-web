import DetailsCard from '@/components/DetailsCard/DetailsCard';
import Symptom from '@/components/FeatureEntries/Symptom/Symptom';

export default function SymptomesCard() {
  return (
    <DetailsCard icon="/tongue.png" title="Symptoms">
      <Symptom />
    </DetailsCard>
  );
}

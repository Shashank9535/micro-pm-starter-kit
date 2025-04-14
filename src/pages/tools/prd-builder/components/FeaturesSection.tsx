
import { Feature } from "../types";
import AddFeatureForm from "./AddFeatureForm";
import FeatureList from "./FeatureList";

interface FeaturesSectionProps {
  features: Feature[];
  newFeature: Omit<Feature, 'id'>;
  setNewFeature: React.Dispatch<React.SetStateAction<Omit<Feature, 'id'>>>;
  addFeature: () => void;
  removeFeature: (id: string) => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  newFeature,
  setNewFeature,
  addFeature,
  removeFeature
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Feature List</h2>
      
      <AddFeatureForm 
        newFeature={newFeature}
        setNewFeature={setNewFeature}
        addFeature={addFeature}
      />
      
      {features.length > 0 && (
        <FeatureList 
          features={features}
          removeFeature={removeFeature}
        />
      )}
    </div>
  );
};

export default FeaturesSection;

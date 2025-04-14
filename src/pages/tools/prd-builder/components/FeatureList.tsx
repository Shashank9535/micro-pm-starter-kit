
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Feature } from "../types";

interface FeatureListProps {
  features: Feature[];
  removeFeature: (id: string) => void;
}

const FeatureList: React.FC<FeatureListProps> = ({ features, removeFeature }) => {
  if (features.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-bold mb-4">Current Features ({features.length})</h3>
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      feature.priority === 'High' ? 'bg-red-100 text-red-800' :
                      feature.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {feature.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      feature.status === 'Must Have' ? 'bg-purple-100 text-purple-800' :
                      feature.status === 'Should Have' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFeature(feature.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash size={16} />
                </Button>
              </div>
              <p className="text-sm text-micropm-medium-gray">
                {feature.description || 'No description provided.'}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureList;

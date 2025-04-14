
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { Feature } from "../types";

interface AddFeatureFormProps {
  newFeature: Omit<Feature, 'id'>;
  setNewFeature: React.Dispatch<React.SetStateAction<Omit<Feature, 'id'>>>;
  addFeature: () => void;
}

const AddFeatureForm: React.FC<AddFeatureFormProps> = ({
  newFeature,
  setNewFeature,
  addFeature
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-bold mb-4">Add New Feature</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="feature-title">Feature Title</Label>
            <Input 
              id="feature-title" 
              placeholder="E.g., Social Sign-in" 
              value={newFeature.title}
              onChange={(e) => setNewFeature(prev => ({...prev, title: e.target.value}))}
            />
          </div>
          
          <div>
            <Label htmlFor="feature-description">Description</Label>
            <Textarea 
              id="feature-description" 
              placeholder="Describe the feature and its functionality" 
              value={newFeature.description}
              onChange={(e) => setNewFeature(prev => ({...prev, description: e.target.value}))}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="feature-priority">Priority</Label>
              <select 
                id="feature-priority"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newFeature.priority}
                onChange={(e) => setNewFeature(prev => ({...prev, priority: e.target.value as 'High' | 'Medium' | 'Low'}))}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="feature-status">Status</Label>
              <select 
                id="feature-status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newFeature.status}
                onChange={(e) => setNewFeature(prev => ({...prev, status: e.target.value as 'Must Have' | 'Should Have' | 'Nice to Have'}))}
              >
                <option value="Must Have">Must Have</option>
                <option value="Should Have">Should Have</option>
                <option value="Nice to Have">Nice to Have</option>
              </select>
            </div>
          </div>
          
          <Button 
            onClick={addFeature}
            className="w-full"
          >
            <Plus size={16} className="mr-2" /> Add Feature
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddFeatureForm;

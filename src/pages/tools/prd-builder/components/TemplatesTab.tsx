
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TemplatesTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-2">Basic PRD Template</h3>
          <p className="text-sm text-micropm-medium-gray mb-4">
            A simple PRD structure for small features or products.
          </p>
          <Button className="w-full">Use Template</Button>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-2">Detailed PRD Template</h3>
          <p className="text-sm text-micropm-medium-gray mb-4">
            Comprehensive PRD with detailed sections for complex products.
          </p>
          <Button className="w-full">Use Template</Button>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-2">Feature PRD Template</h3>
          <p className="text-sm text-micropm-medium-gray mb-4">
            Focused template for single feature development.
          </p>
          <Button className="w-full">Use Template</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesTab;


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TemplateSection } from "../types";

interface PRDSectionProps {
  section: TemplateSection;
  content: string;
  expanded: boolean;
  onToggle: () => void;
  onChange: (content: string) => void;
}

const PRDSection: React.FC<PRDSectionProps> = ({ 
  section, 
  content, 
  expanded, 
  onToggle, 
  onChange 
}) => {
  return (
    <Card key={section.id} className="overflow-hidden">
      <div 
        className="p-4 border-b flex justify-between items-center cursor-pointer bg-micropm-soft-gray hover:bg-micropm-soft-gray/80 transition-colors"
        onClick={onToggle}
      >
        <div>
          <h3 className="font-bold">{section.title}</h3>
          <p className="text-sm text-micropm-medium-gray">{section.description}</p>
        </div>
        <Button variant="ghost" size="icon">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </div>
      
      {expanded && (
        <CardContent className="pt-6">
          <Textarea 
            placeholder={section.placeholder}
            className="min-h-32"
            value={content || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default PRDSection;

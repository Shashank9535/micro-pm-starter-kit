
import { TemplateSection } from "../types";
import PRDSection from "./PRDSection";

interface PRDSectionsProps {
  templateSections: TemplateSection[];
  sections: { [key: string]: string };
  expandedSections: { [key: string]: boolean };
  onSectionChange: (sectionId: string, content: string) => void;
  onToggleSection: (sectionId: string) => void;
}

const PRDSections: React.FC<PRDSectionsProps> = ({
  templateSections,
  sections,
  expandedSections,
  onSectionChange,
  onToggleSection
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Document Sections</h2>
      
      {templateSections.map((section) => (
        <PRDSection
          key={section.id}
          section={section}
          content={sections[section.id] || ''}
          expanded={expandedSections[section.id]}
          onToggle={() => onToggleSection(section.id)}
          onChange={(content) => onSectionChange(section.id, content)}
        />
      ))}
    </div>
  );
};

export default PRDSections;

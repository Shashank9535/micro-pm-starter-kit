
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { exportToPDF } from "@/utils/pdfExport";
import { Feature, PRDState } from './prd-builder/types';
import { templateSections } from './prd-builder/constants';
import PRDHeader from './prd-builder/components/PRDHeader';
import PRDSections from './prd-builder/components/PRDSections';
import FeaturesSection from './prd-builder/components/FeaturesSection';
import ActionButtons from './prd-builder/components/ActionButtons';
import TemplatesTab from './prd-builder/components/TemplatesTab';
import { createMarkdownContent, downloadMarkdown } from './prd-builder/utils/exportUtils';

const PRDBuilder = () => {
  const [prdState, setPrdState] = useState<PRDState>({
    title: "",
    author: "",
    date: new Date().toISOString().split('T')[0],
    version: "1.0",
    sections: templateSections.reduce((acc, section) => ({
      ...acc,
      [section.id]: ""
    }), {}),
    features: []
  });

  const [newFeature, setNewFeature] = useState<Omit<Feature, 'id'>>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Should Have"
  });

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>(templateSections.reduce((acc, section) => ({
    ...acc,
    [section.id]: true
  }), {}));

  const handleSectionChange = (sectionId: string, content: string) => {
    setPrdState(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: content
      }
    }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const addFeature = () => {
    if (!newFeature.title.trim()) {
      toast({
        title: "Feature title required",
        description: "Please provide a title for the feature",
        variant: "destructive"
      });
      return;
    }

    const feature: Feature = {
      ...newFeature,
      id: `feature-${Date.now()}`
    };

    setPrdState(prev => ({
      ...prev,
      features: [...prev.features, feature]
    }));

    setNewFeature({
      title: "",
      description: "",
      priority: "Medium",
      status: "Should Have"
    });

    toast({
      title: "Feature added",
      description: `${feature.title} has been added to your PRD`
    });
  };

  const removeFeature = (id: string) => {
    setPrdState(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature.id !== id)
    }));

    toast({
      title: "Feature removed",
      description: "The feature has been removed from your PRD"
    });
  };

  const savePRD = () => {
    if (!prdState.title.trim()) {
      toast({
        title: "PRD title required",
        description: "Please provide a title for your PRD",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, this would save to backend
    localStorage.setItem(`prd-${Date.now()}`, JSON.stringify(prdState));
    
    toast({
      title: "PRD saved successfully",
      description: "Your PRD has been saved locally"
    });
  };

  const downloadPRD = () => {
    if (!prdState.title.trim()) {
      toast({
        title: "PRD title required",
        description: "Please provide a title for your PRD before downloading",
        variant: "destructive"
      });
      return;
    }

    const content = createMarkdownContent(prdState, templateSections);
    const filename = `${prdState.title.replace(/\s+/g, '-').toLowerCase()}-prd.md`;
    
    downloadMarkdown(content, filename);

    toast({
      title: "PRD downloaded",
      description: "Your PRD has been downloaded as a Markdown file"
    });
  };

  const downloadPDF = () => {
    if (!prdState.title.trim()) {
      toast({
        title: "PRD title required",
        description: "Please provide a title for your PRD before downloading",
        variant: "destructive"
      });
      return;
    }

    exportToPDF(prdState, templateSections);
    
    toast({
      title: "PDF downloaded",
      description: "Your PRD has been downloaded as a PDF file"
    });
  };

  const copyToClipboard = () => {
    const content = createMarkdownContent(prdState, templateSections);

    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Your PRD has been copied to your clipboard in Markdown format"
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-10 px-4">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid grid-cols-2 max-w-md mb-8">
              <TabsTrigger value="editor">PRD Editor</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-8">
              <PRDHeader 
                prdState={prdState} 
                setPrdState={setPrdState}
              />

              <PRDSections
                templateSections={templateSections}
                sections={prdState.sections}
                expandedSections={expandedSections}
                onSectionChange={handleSectionChange}
                onToggleSection={toggleSection}
              />

              <FeaturesSection
                features={prdState.features}
                newFeature={newFeature}
                setNewFeature={setNewFeature}
                addFeature={addFeature}
                removeFeature={removeFeature}
              />

              <ActionButtons
                savePRD={savePRD}
                downloadPRD={downloadPRD}
                downloadPDF={downloadPDF}
                copyToClipboard={copyToClipboard}
              />
            </TabsContent>

            <TabsContent value="templates" className="space-y-8">
              <TemplatesTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PRDBuilder;

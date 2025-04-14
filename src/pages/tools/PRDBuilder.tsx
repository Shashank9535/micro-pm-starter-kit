
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { exportToPDF } from "@/utils/pdfExport";
import { 
  FileText, 
  Save, 
  Download, 
  Plus, 
  Trash, 
  ChevronDown, 
  ChevronUp,
  Copy,
  FileDown
} from "lucide-react";

const templateSections = [
  {
    id: "overview",
    title: "Overview",
    description: "A brief summary of what the product/feature is and why it matters.",
    placeholder: "Briefly describe the purpose and scope of this PRD. What problem does it solve?",
  },
  {
    id: "background",
    title: "Background & Strategic Fit",
    description: "The context behind this initiative and how it aligns with company goals.",
    placeholder: "What's the history behind this need? How does it align with company strategy and goals?",
  },
  {
    id: "goals",
    title: "Goals & Success Metrics",
    description: "What this product/feature aims to achieve and how success will be measured.",
    placeholder: "List the key goals and metrics to track success (e.g., user engagement, conversion, etc.).",
  },
  {
    id: "user-problems",
    title: "User Problems & Use Cases",
    description: "The specific user needs this addresses and how users will interact with it.",
    placeholder: "Describe the specific user problems and needs this will address. Include user stories if applicable.",
  },
  {
    id: "requirements",
    title: "Functional Requirements",
    description: "The detailed specifications of what the product/feature must do.",
    placeholder: "List the key requirements and functionality this must deliver.",
  },
  {
    id: "design",
    title: "Design & User Experience",
    description: "The visual and interaction design specifications.",
    placeholder: "Describe the design approach, user flows, and key UX considerations.",
  },
  {
    id: "technical",
    title: "Technical Considerations",
    description: "Technical architecture, dependencies, and constraints.",
    placeholder: "What are the technical requirements, dependencies, or constraints to consider?",
  },
  {
    id: "timeline",
    title: "Timeline & Milestones",
    description: "The proposed schedule for development and release.",
    placeholder: "Outline the proposed timeline with key milestones and dependencies.",
  },
  {
    id: "risks",
    title: "Risks & Mitigations",
    description: "Potential issues and how they'll be addressed.",
    placeholder: "What are the potential risks, and how will they be mitigated?",
  },
  {
    id: "open-questions",
    title: "Open Questions",
    description: "Unresolved issues that need further research or discussion.",
    placeholder: "List any open questions or areas needing additional research.",
  },
];

interface Feature {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Must Have' | 'Should Have' | 'Nice to Have';
}

interface PRDState {
  title: string;
  author: string;
  date: string;
  version: string;
  sections: {
    [key: string]: string;
  };
  features: Feature[];
}

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

    // Create formatted content for download
    let content = `# ${prdState.title}\n\n`;
    content += `**Author:** ${prdState.author}\n`;
    content += `**Date:** ${prdState.date}\n`;
    content += `**Version:** ${prdState.version}\n\n`;

    // Add sections
    templateSections.forEach(section => {
      content += `## ${section.title}\n\n`;
      content += `${prdState.sections[section.id] || 'No content provided.'}\n\n`;
    });

    // Add features
    content += `## Feature List\n\n`;
    if (prdState.features.length > 0) {
      prdState.features.forEach(feature => {
        content += `### ${feature.title}\n\n`;
        content += `**Priority:** ${feature.priority}\n`;
        content += `**Status:** ${feature.status}\n\n`;
        content += `${feature.description || 'No description provided.'}\n\n`;
      });
    } else {
      content += "No features defined.\n\n";
    }

    // Create and download the file
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${prdState.title.replace(/\s+/g, '-').toLowerCase()}-prd.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

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
    // Create formatted content for clipboard
    let content = `# ${prdState.title}\n\n`;
    content += `**Author:** ${prdState.author}\n`;
    content += `**Date:** ${prdState.date}\n`;
    content += `**Version:** ${prdState.version}\n\n`;

    // Add sections
    templateSections.forEach(section => {
      content += `## ${section.title}\n\n`;
      content += `${prdState.sections[section.id] || 'No content provided.'}\n\n`;
    });

    // Add features
    content += `## Feature List\n\n`;
    if (prdState.features.length > 0) {
      prdState.features.forEach(feature => {
        content += `### ${feature.title}\n\n`;
        content += `**Priority:** ${feature.priority}\n`;
        content += `**Status:** ${feature.status}\n\n`;
        content += `${feature.description || 'No description provided.'}\n\n`;
      });
    } else {
      content += "No features defined.\n\n";
    }

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
          <div className="flex items-center mb-8">
            <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mr-4">
              <FileText className="h-6 w-6 text-micropm-purple" />
            </div>
            <h1 className="text-3xl font-bold">PRD Builder</h1>
          </div>

          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid grid-cols-2 max-w-md mb-8">
              <TabsTrigger value="editor">PRD Editor</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="prd-title">PRD Title</Label>
                        <Input 
                          id="prd-title" 
                          placeholder="E.g., User Authentication Feature" 
                          value={prdState.title}
                          onChange={(e) => setPrdState(prev => ({...prev, title: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prd-author">Author</Label>
                        <Input 
                          id="prd-author" 
                          placeholder="Your name" 
                          value={prdState.author}
                          onChange={(e) => setPrdState(prev => ({...prev, author: e.target.value}))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="prd-date">Date</Label>
                        <Input 
                          id="prd-date" 
                          type="date" 
                          value={prdState.date}
                          onChange={(e) => setPrdState(prev => ({...prev, date: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prd-version">Version</Label>
                        <Input 
                          id="prd-version" 
                          placeholder="1.0" 
                          value={prdState.version}
                          onChange={(e) => setPrdState(prev => ({...prev, version: e.target.value}))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Document Sections</h2>
                
                {templateSections.map((section) => (
                  <Card key={section.id} className="overflow-hidden">
                    <div 
                      className="p-4 border-b flex justify-between items-center cursor-pointer bg-micropm-soft-gray hover:bg-micropm-soft-gray/80 transition-colors"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div>
                        <h3 className="font-bold">{section.title}</h3>
                        <p className="text-sm text-micropm-medium-gray">{section.description}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        {expandedSections[section.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </Button>
                    </div>
                    
                    {expandedSections[section.id] && (
                      <CardContent className="pt-6">
                        <Textarea 
                          placeholder={section.placeholder}
                          className="min-h-32"
                          value={prdState.sections[section.id] || ''}
                          onChange={(e) => handleSectionChange(section.id, e.target.value)}
                        />
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Feature List</h2>
                
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
                
                {prdState.features.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Current Features ({prdState.features.length})</h3>
                      <div className="space-y-4">
                        {prdState.features.map((feature) => (
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
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={savePRD} className="micropm-btn flex-1">
                  <Save size={16} className="mr-2" /> Save PRD
                </Button>
                <Button onClick={downloadPRD} variant="outline" className="micropm-btn-outline flex-1">
                  <Download size={16} className="mr-2" /> Download as Markdown
                </Button>
                <Button onClick={downloadPDF} variant="outline" className="micropm-btn-outline flex-1">
                  <FileDown size={16} className="mr-2" /> Export as PDF
                </Button>
                <Button onClick={copyToClipboard} variant="outline" className="micropm-btn-outline flex-1">
                  <Copy size={16} className="mr-2" /> Copy to Clipboard
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-8">
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PRDBuilder;

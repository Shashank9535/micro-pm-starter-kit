
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ClipboardCheck, 
  Plus, 
  Download, 
  Save, 
  Copy, 
  Edit2, 
  Trash,
  Move,
  GripVertical
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'checkbox' | 'rating' | 'open_ended';
  options?: string[];
  required: boolean;
}

interface Template {
  id: string;
  title: string;
  description: string;
  type: 'interview' | 'survey';
  target: string;
  questions: Question[];
  createdAt: string;
}

const sampleTemplates: Template[] = [
  {
    id: 'template1',
    title: 'Product-Market Fit Interview',
    description: 'A template for interviewing potential customers to validate product-market fit.',
    type: 'interview',
    target: 'Potential customers',
    createdAt: '2025-04-10',
    questions: [
      {
        id: 'q1',
        text: 'Introduction & Background',
        type: 'text',
        required: false,
        options: ["Thank you for taking the time to speak with me today. Before we begin, I'd like to give you a brief overview of what we'll be discussing and how this interview will work."]
      },
      {
        id: 'q2',
        text: 'Can you tell me about yourself and your role?',
        type: 'open_ended',
        required: true
      },
      {
        id: 'q3',
        text: 'What are your biggest challenges related to [problem area]?',
        type: 'open_ended',
        required: true
      },
      {
        id: 'q4',
        text: 'How do you currently solve this problem?',
        type: 'open_ended',
        required: true
      },
      {
        id: 'q5',
        text: 'What would an ideal solution look like for you?',
        type: 'open_ended',
        required: true
      },
      {
        id: 'q6',
        text: 'On a scale of 1-5, how important is solving this problem for you?',
        type: 'rating',
        required: true
      },
      {
        id: 'q7',
        text: 'Would you be willing to pay for a solution that addresses this problem?',
        type: 'multiple_choice',
        options: ['Yes, definitely', 'Maybe, depends on the price', 'No'],
        required: true
      }
    ]
  },
  {
    id: 'template2',
    title: 'User Satisfaction Survey',
    description: 'A survey to measure user satisfaction and collect feedback on existing features.',
    type: 'survey',
    target: 'Current users',
    createdAt: '2025-04-08',
    questions: [
      {
        id: 'q1',
        text: 'How satisfied are you with our product on a scale of 1-10?',
        type: 'rating',
        required: true
      },
      {
        id: 'q2',
        text: 'What features do you use most frequently?',
        type: 'checkbox',
        options: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
        required: true
      },
      {
        id: 'q3',
        text: 'What improvements would you like to see?',
        type: 'open_ended',
        required: false
      },
      {
        id: 'q4',
        text: 'How likely are you to recommend our product to others?',
        type: 'rating',
        required: true
      },
      {
        id: 'q5',
        text: 'Any additional feedback you\'d like to share?',
        type: 'open_ended',
        required: false
      }
    ]
  }
];

const InterviewSurveyTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>(sampleTemplates);
  const [activeTab, setActiveTab] = useState<'all' | 'interview' | 'survey'>('all');
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [editTemplate, setEditTemplate] = useState<Template | null>(null);
  
  const activeTemplate = templates.find(t => t.id === activeTemplateId);
  
  const filteredTemplates = activeTab === 'all' 
    ? templates 
    : templates.filter(t => t.type === activeTab);

  const addNewTemplate = () => {
    if (!editTemplate) return;
    
    if (!editTemplate.title.trim() || !editTemplate.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title and description for your template",
        variant: "destructive"
      });
      return;
    }
    
    if (editTemplate.questions.length === 0) {
      toast({
        title: "Questions required",
        description: "Please add at least one question to your template",
        variant: "destructive"
      });
      return;
    }
    
    const newTemplate: Template = {
      ...editTemplate,
      id: `template-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setIsAddDialogOpen(false);
    setActiveTemplateId(newTemplate.id);
    
    toast({
      title: "Template created",
      description: `${newTemplate.title} has been created successfully`
    });
  };

  const updateTemplate = () => {
    if (!editTemplate) return;
    
    if (!editTemplate.title.trim() || !editTemplate.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title and description for your template",
        variant: "destructive"
      });
      return;
    }
    
    if (editTemplate.questions.length === 0) {
      toast({
        title: "Questions required",
        description: "Please add at least one question to your template",
        variant: "destructive"
      });
      return;
    }
    
    setTemplates(prev => prev.map(t => 
      t.id === editTemplate.id ? editTemplate : t
    ));
    
    setIsEditMode(false);
    
    toast({
      title: "Template updated",
      description: `${editTemplate.title} has been updated successfully`
    });
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    
    if (activeTemplateId === id) {
      setActiveTemplateId(null);
    }
    
    toast({
      title: "Template deleted",
      description: "The template has been deleted successfully"
    });
  };

  const addQuestion = () => {
    if (!editTemplate) return;
    
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: '',
      type: 'open_ended',
      required: false
    };
    
    setEditTemplate({
      ...editTemplate,
      questions: [...editTemplate.questions, newQuestion]
    });
  };

  const updateQuestion = (questionId: string, field: keyof Question, value: any) => {
    if (!editTemplate) return;
    
    setEditTemplate({
      ...editTemplate,
      questions: editTemplate.questions.map(q => 
        q.id === questionId
          ? { ...q, [field]: value }
          : q
      )
    });
  };

  const updateQuestionOption = (questionId: string, index: number, value: string) => {
    if (!editTemplate) return;
    
    setEditTemplate({
      ...editTemplate,
      questions: editTemplate.questions.map(q => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[index] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    });
  };

  const addQuestionOption = (questionId: string) => {
    if (!editTemplate) return;
    
    setEditTemplate({
      ...editTemplate,
      questions: editTemplate.questions.map(q => {
        if (q.id === questionId) {
          const currentOptions = q.options || [];
          return { ...q, options: [...currentOptions, ''] };
        }
        return q;
      })
    });
  };

  const removeQuestionOption = (questionId: string, index: number) => {
    if (!editTemplate) return;
    
    setEditTemplate({
      ...editTemplate,
      questions: editTemplate.questions.map(q => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions.splice(index, 1);
          return { ...q, options: newOptions };
        }
        return q;
      })
    });
  };

  const deleteQuestion = (questionId: string) => {
    if (!editTemplate) return;
    
    setEditTemplate({
      ...editTemplate,
      questions: editTemplate.questions.filter(q => q.id !== questionId)
    });
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    if (!editTemplate) return;
    
    const questions = [...editTemplate.questions];
    const index = questions.findIndex(q => q.id === questionId);
    
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === questions.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const question = questions[index];
    
    questions.splice(index, 1);
    questions.splice(newIndex, 0, question);
    
    setEditTemplate({
      ...editTemplate,
      questions
    });
  };

  const saveTemplates = () => {
    // In a real implementation, this would save to backend
    localStorage.setItem('interview-survey-templates', JSON.stringify(templates));
    
    toast({
      title: "Templates saved",
      description: "All templates have been saved locally"
    });
  };

  const downloadTemplate = (template: Template) => {
    // Create formatted content for download
    let content = `# ${template.title}\n\n`;
    
    content += `**Type:** ${template.type === 'interview' ? 'Interview Script' : 'Survey Template'}\n`;
    content += `**Target Audience:** ${template.target}\n`;
    content += `**Created:** ${template.createdAt}\n\n`;
    
    content += `## Description\n\n${template.description}\n\n`;
    
    content += `## Questions\n\n`;
    
    template.questions.forEach((question, index) => {
      content += `### ${index + 1}. ${question.text}${question.required ? ' *' : ''}\n\n`;
      
      content += `Type: ${question.type.replace('_', ' ')}\n\n`;
      
      if (question.options && question.options.length > 0) {
        content += `Options:\n`;
        question.options.forEach(option => {
          content += `- ${option}\n`;
        });
        content += '\n';
      }
    });
    
    // Create and download the file
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${template.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Template downloaded",
      description: `${template.title} has been downloaded as a Markdown file`
    });
  };

  const copyTemplateToClipboard = (template: Template) => {
    // Create formatted content for clipboard
    let content = `# ${template.title}\n\n`;
    
    content += `**Type:** ${template.type === 'interview' ? 'Interview Script' : 'Survey Template'}\n`;
    content += `**Target Audience:** ${template.target}\n`;
    content += `**Created:** ${template.createdAt}\n\n`;
    
    content += `## Description\n\n${template.description}\n\n`;
    
    content += `## Questions\n\n`;
    
    template.questions.forEach((question, index) => {
      content += `### ${index + 1}. ${question.text}${question.required ? ' *' : ''}\n\n`;
      
      content += `Type: ${question.type.replace('_', ' ')}\n\n`;
      
      if (question.options && question.options.length > 0) {
        content += `Options:\n`;
        question.options.forEach(option => {
          content += `- ${option}\n`;
        });
        content += '\n';
      }
    });
    
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${template.title} has been copied to your clipboard in Markdown format`
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive"
      });
    });
  };

  const handleEditClick = (template: Template) => {
    setEditTemplate({...template});
    setIsEditMode(true);
  };

  const handleCreateNew = (type: 'interview' | 'survey') => {
    setEditTemplate({
      id: '',
      title: '',
      description: '',
      type,
      target: '',
      questions: [],
      createdAt: ''
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-10 px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mr-4">
                <ClipboardCheck className="h-6 w-6 text-micropm-purple" />
              </div>
              <h1 className="text-3xl font-bold">Interview & Survey Templates</h1>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={saveTemplates}>
                <Save size={16} className="mr-2" /> Save All
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus size={16} className="mr-2" /> Create New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Create New Template</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-6 py-6">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCreateNew('interview')}>
                      <CardContent className="pt-6 text-center">
                        <div className="bg-micropm-soft-gray p-3 rounded-full inline-flex mb-4">
                          <ClipboardCheck className="h-6 w-6 text-micropm-purple" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Interview Script</h3>
                        <p className="text-sm text-micropm-medium-gray">
                          Create a structured interview script for user research
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCreateNew('survey')}>
                      <CardContent className="pt-6 text-center">
                        <div className="bg-micropm-soft-gray p-3 rounded-full inline-flex mb-4">
                          <ClipboardCheck className="h-6 w-6 text-micropm-purple" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Survey Template</h3>
                        <p className="text-sm text-micropm-medium-gray">
                          Create a survey for collecting quantitative data
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mb-8">
              <TabsTrigger value="all">All Templates</TabsTrigger>
              <TabsTrigger value="interview">Interviews</TabsTrigger>
              <TabsTrigger value="survey">Surveys</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Template List */}
              <div className="md:col-span-1 space-y-4">
                {filteredTemplates.length > 0 ? (
                  <div className="space-y-3">
                    {filteredTemplates.map(template => (
                      <Card 
                        key={template.id} 
                        className={`cursor-pointer hover:shadow-md transition-shadow ${
                          activeTemplateId === template.id ? 'border-micropm-purple' : ''
                        }`}
                        onClick={() => {
                          setActiveTemplateId(template.id);
                          setIsEditMode(false);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{template.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              template.type === 'interview' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {template.type === 'interview' ? 'Interview' : 'Survey'}
                            </span>
                          </div>
                          <p className="text-sm text-micropm-medium-gray line-clamp-2 mb-2">
                            {template.description}
                          </p>
                          <div className="flex justify-between items-center text-xs text-micropm-medium-gray">
                            <span>{template.target}</span>
                            <span>{template.questions.length} questions</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-medium mb-2">No templates found</h3>
                      <p className="text-sm text-micropm-medium-gray mb-4">
                        Create a new template to get started
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus size={14} className="mr-2" /> Create New
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Right Column: Template Content */}
              <div className="md:col-span-2">
                {activeTemplate && !isEditMode ? (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle>{activeTemplate.title}</CardTitle>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              activeTemplate.type === 'interview' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {activeTemplate.type === 'interview' ? 'Interview' : 'Survey'}
                            </span>
                          </div>
                          <CardDescription>
                            {activeTemplate.description}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEditClick(activeTemplate)}
                          >
                            <Edit2 size={14} className="mr-2" /> Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                            onClick={() => deleteTemplate(activeTemplate.id)}
                          >
                            <Trash size={14} className="mr-2" /> Delete
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-micropm-medium-gray mt-4">
                        <span>Target: {activeTemplate.target}</span>
                        <span>Created: {activeTemplate.createdAt}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold mb-4">Questions ({activeTemplate.questions.length})</h3>
                      <div className="space-y-6">
                        {activeTemplate.questions.map((question, index) => (
                          <div key={question.id} className="border rounded-md p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex gap-2">
                                <span className="bg-micropm-soft-gray rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </span>
                                <div>
                                  <h4 className="font-medium">{question.text}</h4>
                                  <div className="flex gap-2 mt-1">
                                    <span className="text-xs px-2 py-1 rounded-full bg-micropm-soft-gray">
                                      {question.type.replace('_', ' ')}
                                    </span>
                                    {question.required && (
                                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                                        Required
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {question.options && question.options.length > 0 && (
                              <div className="mt-3 ml-8">
                                <h5 className="text-sm font-medium mb-2">Options:</h5>
                                <ul className="list-disc list-inside text-micropm-medium-gray text-sm">
                                  {question.options.map((option, i) => (
                                    <li key={i}>{option}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => downloadTemplate(activeTemplate)}
                        >
                          <Download size={14} className="mr-2" /> Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyTemplateToClipboard(activeTemplate)}
                        >
                          <Copy size={14} className="mr-2" /> Copy to Clipboard
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ) : isEditMode && editTemplate ? (
                  // Edit Mode
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {editTemplate.id ? 'Edit Template' : 'Create New Template'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="template-title">Title</Label>
                            <Input 
                              id="template-title" 
                              value={editTemplate.title}
                              onChange={(e) => setEditTemplate(prev => prev ? { ...prev, title: e.target.value } : null)}
                              placeholder="E.g., Product-Market Fit Interview"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="template-target">Target Audience</Label>
                            <Input 
                              id="template-target" 
                              value={editTemplate.target}
                              onChange={(e) => setEditTemplate(prev => prev ? { ...prev, target: e.target.value } : null)}
                              placeholder="E.g., Potential customers"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="template-description">Description</Label>
                          <Textarea 
                            id="template-description" 
                            value={editTemplate.description}
                            onChange={(e) => setEditTemplate(prev => prev ? { ...prev, description: e.target.value } : null)}
                            placeholder="Describe the purpose and context of this template"
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Questions ({editTemplate.questions.length})</h3>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={addQuestion}
                          >
                            <Plus size={14} className="mr-2" /> Add Question
                          </Button>
                        </div>
                        
                        <div className="space-y-6">
                          {editTemplate.questions.map((question, index) => (
                            <div key={question.id} className="border rounded-md p-4">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-2">
                                  <span className="bg-micropm-soft-gray rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">
                                    {index + 1}
                                  </span>
                                  <h4 className="font-medium pt-0.5">Question</h4>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8"
                                    onClick={() => moveQuestion(question.id, 'up')}
                                    disabled={index === 0}
                                  >
                                    <Move className="h-4 w-4 rotate-90" />
                                  </Button>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8"
                                    onClick={() => moveQuestion(question.id, 'down')}
                                    disabled={index === editTemplate.questions.length - 1}
                                  >
                                    <Move className="h-4 w-4 -rotate-90" />
                                  </Button>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => deleteQuestion(question.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                                  <Input 
                                    id={`question-${question.id}`} 
                                    value={question.text}
                                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                                    placeholder="Enter your question here"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`question-type-${question.id}`}>Question Type</Label>
                                    <select 
                                      id={`question-type-${question.id}`}
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      value={question.type}
                                      onChange={(e) => updateQuestion(question.id, 'type', e.target.value as any)}
                                    >
                                      <option value="text">Text (Instructions)</option>
                                      <option value="open_ended">Open-ended</option>
                                      <option value="multiple_choice">Multiple Choice</option>
                                      <option value="checkbox">Checkbox</option>
                                      <option value="rating">Rating</option>
                                    </select>
                                  </div>
                                  <div className="space-y-2 flex items-end">
                                    <div className="flex items-center h-10 space-x-2">
                                      <input
                                        type="checkbox"
                                        id={`question-required-${question.id}`}
                                        checked={question.required}
                                        onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-micropm-purple focus:ring-micropm-purple"
                                      />
                                      <Label htmlFor={`question-required-${question.id}`}>Required question</Label>
                                    </div>
                                  </div>
                                </div>
                                
                                {(question.type === 'multiple_choice' || question.type === 'checkbox') && (
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <Label>Options</Label>
                                      <Button 
                                        type="button" 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => addQuestionOption(question.id)}
                                      >
                                        Add Option
                                      </Button>
                                    </div>
                                    {question.options && question.options.map((option, optionIndex) => (
                                      <div key={`option-${question.id}-${optionIndex}`} className="flex gap-2">
                                        <Input 
                                          value={option}
                                          onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
                                          placeholder={`Option ${optionIndex + 1}`}
                                        />
                                        {(question.options?.length || 0) > 1 && (
                                          <Button 
                                            type="button" 
                                            size="icon" 
                                            variant="outline" 
                                            onClick={() => removeQuestionOption(question.id, optionIndex)}
                                          >
                                            <Trash size={16} />
                                          </Button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {editTemplate.questions.length === 0 && (
                            <div className="flex flex-col items-center justify-center border rounded-md p-6 text-center">
                              <ClipboardCheck className="h-12 w-12 text-micropm-medium-gray mb-4 opacity-40" />
                              <h3 className="font-medium mb-2">No Questions Yet</h3>
                              <p className="text-micropm-medium-gray mb-4">
                                Add questions to create your template
                              </p>
                              <Button size="sm" onClick={addQuestion}>
                                <Plus size={14} className="mr-2" /> Add First Question
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditMode(false);
                          setIsAddDialogOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={editTemplate.id ? updateTemplate : addNewTemplate}>
                        {editTemplate.id ? 'Save Changes' : 'Create Template'}
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border h-96 p-6 text-center">
                    <ClipboardCheck size={48} className="text-micropm-medium-gray mb-4 opacity-40" />
                    <h3 className="text-xl font-bold mb-2">No Template Selected</h3>
                    <p className="text-micropm-medium-gray mb-6">
                      Select a template from the list to view details, or create a new one.
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus size={16} className="mr-2" /> Create New Template
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewSurveyTemplates;

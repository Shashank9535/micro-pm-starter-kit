
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
import { 
  Zap, 
  Copy, 
  ArrowRight, 
  Check, 
  Calendar, 
  Clock, 
  CalendarDays,
  PenLine,
  Plus,
  Trash,
  Send
} from "lucide-react";
import ZapierForm from "@/components/ZapierForm";

interface CheckInTemplate {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  questions: string[];
}

interface CheckInRecord {
  id: string;
  templateId: string;
  date: string;
  answers: {
    questionId: number;
    question: string;
    answer: string;
  }[];
}

const defaultTemplates: CheckInTemplate[] = [
  {
    id: 'template1',
    title: 'Weekly Product Progress',
    frequency: 'weekly',
    questions: [
      'What progress did you make on your product this week?',
      'What challenges or blockers did you encounter?',
      'What are your top priorities for next week?',
      'Are there any resources or help you need?'
    ]
  },
  {
    id: 'template2',
    title: 'Sprint Retrospective',
    frequency: 'biweekly',
    questions: [
      'What went well in this sprint?',
      'What could have gone better?',
      'What have you learned?',
      'What specific improvements will you implement in the next sprint?'
    ]
  },
  {
    id: 'template3',
    title: 'Monthly Goal Review',
    frequency: 'monthly',
    questions: [
      'Did you meet your goals for the month? Why or why not?',
      'What metrics improved this month?',
      'What key user feedback did you receive and how are you addressing it?',
      'What are your top 3 goals for next month?'
    ]
  }
];

const sampleCheckIns: CheckInRecord[] = [
  {
    id: 'checkin1',
    templateId: 'template1',
    date: '2025-04-12',
    answers: [
      {
        questionId: 0,
        question: 'What progress did you make on your product this week?',
        answer: 'Implemented the user authentication system and started working on the dashboard UI. Completed about 70% of the planned tasks for this week.'
      },
      {
        questionId: 1,
        question: 'What challenges or blockers did you encounter?',
        answer: 'Had some issues with the third-party API integration that took longer than expected to debug.'
      },
      {
        questionId: 2,
        question: 'What are your top priorities for next week?',
        answer: 'Finish the dashboard UI, implement data visualization components, and start working on the user settings page.'
      },
      {
        questionId: 3,
        question: 'Are there any resources or help you need?',
        answer: 'Need some feedback on the dashboard wireframes before proceeding with the final implementation.'
      }
    ]
  },
  {
    id: 'checkin2',
    templateId: 'template1',
    date: '2025-04-05',
    answers: [
      {
        questionId: 0,
        question: 'What progress did you make on your product this week?',
        answer: 'Completed the initial wireframes and set up the project repository. Started working on the basic infrastructure.'
      },
      {
        questionId: 1,
        question: 'What challenges or blockers did you encounter?',
        answer: 'Deciding on the tech stack took longer than expected as we had to research various options.'
      },
      {
        questionId: 2,
        question: 'What are your top priorities for next week?',
        answer: 'Begin implementing the user authentication system and set up the database schema.'
      },
      {
        questionId: 3,
        question: 'Are there any resources or help you need?',
        answer: 'Could use some advice on the best authentication provider for our specific needs.'
      }
    ]
  }
];

const WeeklyCheckin = () => {
  const [templates, setTemplates] = useState<CheckInTemplate[]>(defaultTemplates);
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>(sampleCheckIns);
  const [activeTab, setActiveTab] = useState('templates');
  const [currentTemplate, setCurrentTemplate] = useState<CheckInTemplate | null>(null);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [editTemplate, setEditTemplate] = useState<CheckInTemplate | null>(null);
  
  const [currentCheckIn, setCurrentCheckIn] = useState<CheckInRecord | null>(null);
  const [newCheckInTemplate, setNewCheckInTemplate] = useState<string | null>(null);
  const [newCheckInAnswers, setNewCheckInAnswers] = useState<{
    questionId: number;
    question: string;
    answer: string;
  }[]>([]);

  const handleAddTemplate = () => {
    if (!editTemplate) return;
    
    if (!editTemplate.title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your check-in template",
        variant: "destructive"
      });
      return;
    }
    
    if (editTemplate.questions.length === 0 || editTemplate.questions.some(q => !q.trim())) {
      toast({
        title: "Questions required",
        description: "Please provide at least one question with content",
        variant: "destructive"
      });
      return;
    }
    
    const newTemplate: CheckInTemplate = {
      ...editTemplate,
      id: `template-${Date.now()}`
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setEditTemplate(null);
    setIsEditingTemplate(false);
    
    toast({
      title: "Template created",
      description: `${newTemplate.title} has been created successfully`
    });
  };

  const handleUpdateTemplate = () => {
    if (!editTemplate) return;
    
    if (!editTemplate.title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your check-in template",
        variant: "destructive"
      });
      return;
    }
    
    if (editTemplate.questions.length === 0 || editTemplate.questions.some(q => !q.trim())) {
      toast({
        title: "Questions required",
        description: "Please provide at least one question with content",
        variant: "destructive"
      });
      return;
    }
    
    setTemplates(prev => prev.map(t => 
      t.id === editTemplate.id ? editTemplate : t
    ));
    
    setEditTemplate(null);
    setIsEditingTemplate(false);
    
    toast({
      title: "Template updated",
      description: `${editTemplate.title} has been updated successfully`
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    
    if (currentTemplate?.id === id) {
      setCurrentTemplate(null);
    }
    
    toast({
      title: "Template deleted",
      description: "The template has been deleted successfully"
    });
  };

  const handleStartNewCheckIn = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    
    setNewCheckInTemplate(templateId);
    setNewCheckInAnswers(
      template.questions.map((question, index) => ({
        questionId: index,
        question,
        answer: ''
      }))
    );
    setActiveTab('check-in');
  };

  const handleSubmitCheckIn = () => {
    if (!newCheckInTemplate) return;
    
    if (newCheckInAnswers.some(a => !a.answer.trim())) {
      toast({
        title: "All questions required",
        description: "Please answer all the questions before submitting",
        variant: "destructive"
      });
      return;
    }
    
    const newCheckIn: CheckInRecord = {
      id: `checkin-${Date.now()}`,
      templateId: newCheckInTemplate,
      date: new Date().toISOString().split('T')[0],
      answers: newCheckInAnswers
    };
    
    setCheckIns(prev => [newCheckIn, ...prev]);
    setNewCheckInTemplate(null);
    setNewCheckInAnswers([]);
    setCurrentCheckIn(newCheckIn);
    setActiveTab('history');
    
    toast({
      title: "Check-in submitted",
      description: "Your check-in has been recorded successfully"
    });
  };

  const handleUpdateAnswer = (questionId: number, answer: string) => {
    setNewCheckInAnswers(prev => 
      prev.map(a => a.questionId === questionId ? { ...a, answer } : a)
    );
  };

  const addQuestion = () => {
    if (!editTemplate) return;
    
    setEditTemplate({
      ...editTemplate,
      questions: [...editTemplate.questions, '']
    });
  };

  const updateQuestion = (index: number, value: string) => {
    if (!editTemplate) return;
    
    const updatedQuestions = [...editTemplate.questions];
    updatedQuestions[index] = value;
    
    setEditTemplate({
      ...editTemplate,
      questions: updatedQuestions
    });
  };

  const deleteQuestion = (index: number) => {
    if (!editTemplate) return;
    
    const updatedQuestions = [...editTemplate.questions];
    updatedQuestions.splice(index, 1);
    
    setEditTemplate({
      ...editTemplate,
      questions: updatedQuestions
    });
  };

  const getTemplateFrequencyText = (frequency: CheckInTemplate['frequency']) => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'biweekly': return 'Every two weeks';
      case 'monthly': return 'Monthly';
      default: return '';
    }
  };

  const copyTemplateToEmail = (template: CheckInTemplate) => {
    let content = `${template.title}\n\n`;
    
    template.questions.forEach((question, index) => {
      content += `${index + 1}. ${question}\n\n`;
    });
    
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Template questions have been copied to your clipboard"
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mr-4">
                <Zap className="h-6 w-6 text-micropm-purple" />
              </div>
              <h1 className="text-3xl font-bold">Weekly Check-in Prompts</h1>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mb-8">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="check-in">New Check-in</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Template List */}
                <div className="md:col-span-1 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Templates</h2>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setEditTemplate({
                          id: '',
                          title: '',
                          frequency: 'weekly',
                          questions: ['']
                        });
                        setIsEditingTemplate(true);
                        setCurrentTemplate(null);
                      }}
                    >
                      <Plus size={14} className="mr-2" /> New
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {templates.map(template => (
                      <Card 
                        key={template.id} 
                        className={`cursor-pointer hover:shadow-md transition-shadow ${
                          currentTemplate?.id === template.id ? 'border-micropm-purple' : ''
                        }`}
                        onClick={() => {
                          setCurrentTemplate(template);
                          setIsEditingTemplate(false);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{template.title}</h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-micropm-soft-gray">
                              {getTemplateFrequencyText(template.frequency)}
                            </span>
                          </div>
                          <p className="text-xs text-micropm-medium-gray">
                            {template.questions.length} questions
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Template Details or Editor */}
                <div className="md:col-span-2">
                  {isEditingTemplate && editTemplate ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {editTemplate.id ? 'Edit Template' : 'Create New Template'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="template-title">Template Title</Label>
                            <Input 
                              id="template-title" 
                              value={editTemplate.title}
                              onChange={(e) => setEditTemplate(prev => prev ? { ...prev, title: e.target.value } : null)}
                              placeholder="E.g., Weekly Progress Report" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="template-frequency">Frequency</Label>
                            <select 
                              id="template-frequency"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={editTemplate.frequency}
                              onChange={(e) => setEditTemplate(prev => prev ? { ...prev, frequency: e.target.value as any } : null)}
                            >
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="biweekly">Biweekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <Label>Questions</Label>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={addQuestion}
                            >
                              <Plus size={14} className="mr-2" /> Add Question
                            </Button>
                          </div>
                          
                          {editTemplate.questions.map((question, index) => (
                            <div key={index} className="flex gap-2">
                              <div className="flex-grow space-y-2">
                                <Label htmlFor={`question-${index}`} className="sr-only">Question {index + 1}</Label>
                                <Textarea 
                                  id={`question-${index}`} 
                                  value={question}
                                  onChange={(e) => updateQuestion(index, e.target.value)}
                                  placeholder={`Question ${index + 1}`}
                                  className="resize-none"
                                />
                              </div>
                              {editTemplate.questions.length > 1 && (
                                <Button 
                                  type="button" 
                                  size="icon" 
                                  variant="outline" 
                                  onClick={() => deleteQuestion(index)}
                                  className="h-10 w-10 shrink-0 mt-8"
                                >
                                  <Trash size={16} />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-4">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsEditingTemplate(false);
                            setEditTemplate(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={editTemplate.id ? handleUpdateTemplate : handleAddTemplate}
                        >
                          {editTemplate.id ? 'Save Changes' : 'Create Template'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : currentTemplate ? (
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{currentTemplate.title}</CardTitle>
                            <CardDescription>
                              {getTemplateFrequencyText(currentTemplate.frequency)} check-in with {currentTemplate.questions.length} questions
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => {
                                setEditTemplate({ ...currentTemplate });
                                setIsEditingTemplate(true);
                              }}
                            >
                              <PenLine size={14} className="mr-2" /> Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                              onClick={() => handleDeleteTemplate(currentTemplate.id)}
                            >
                              <Trash size={14} className="mr-2" /> Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-semibold">Questions</h3>
                          <ol className="space-y-3 list-decimal list-inside">
                            {currentTemplate.questions.map((question, index) => (
                              <li key={index} className="pl-2">
                                <span className="text-micropm-medium-gray">{question}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => copyTemplateToEmail(currentTemplate)}
                        >
                          <Copy size={14} className="mr-2" /> Copy to Clipboard
                        </Button>
                        <Button 
                          onClick={() => handleStartNewCheckIn(currentTemplate.id)}
                        >
                          <Zap size={14} className="mr-2" /> Start Check-in
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border h-96 p-6 text-center">
                      <Zap size={48} className="text-micropm-medium-gray mb-4 opacity-40" />
                      <h3 className="text-xl font-bold mb-2">No Template Selected</h3>
                      <p className="text-micropm-medium-gray mb-6">
                        Select a template from the list to view details, or create a new one.
                      </p>
                      <Button 
                        onClick={() => {
                          setEditTemplate({
                            id: '',
                            title: '',
                            frequency: 'weekly',
                            questions: ['']
                          });
                          setIsEditingTemplate(true);
                        }}
                      >
                        <Plus size={16} className="mr-2" /> Create New Template
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Automate Your Check-ins</CardTitle>
                  <CardDescription>
                    Set up automated check-in prompts via email to maintain momentum and track progress consistently.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ZapierForm />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="check-in" className="space-y-8">
              {newCheckInTemplate ? (
                <Card>
                  <CardHeader>
                    <CardTitle>New Check-in</CardTitle>
                    <CardDescription>
                      {templates.find(t => t.id === newCheckInTemplate)?.title} - {new Date().toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {newCheckInAnswers.map((item) => (
                      <div key={item.questionId} className="space-y-2">
                        <Label htmlFor={`answer-${item.questionId}`}>
                          {item.question}
                        </Label>
                        <Textarea 
                          id={`answer-${item.questionId}`} 
                          value={item.answer}
                          onChange={(e) => handleUpdateAnswer(item.questionId, e.target.value)}
                          placeholder="Your answer here..."
                          className="min-h-32"
                        />
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setNewCheckInTemplate(null);
                        setNewCheckInAnswers([]);
                        setActiveTab('templates');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitCheckIn}>
                      <Send size={14} className="mr-2" /> Submit Check-in
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border h-96 p-6 text-center">
                  <Zap size={48} className="text-micropm-medium-gray mb-4 opacity-40" />
                  <h3 className="text-xl font-bold mb-2">No Active Check-in</h3>
                  <p className="text-micropm-medium-gray mb-6">
                    Start a new check-in from one of your templates.
                  </p>
                  <Button onClick={() => setActiveTab('templates')}>
                    <ArrowRight size={16} className="mr-2" /> Choose a Template
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Check-in List */}
                <div className="md:col-span-1 space-y-4">
                  <h2 className="text-xl font-bold">Past Check-ins</h2>
                  
                  {checkIns.length > 0 ? (
                    <div className="space-y-3">
                      {checkIns.map(checkIn => (
                        <Card 
                          key={checkIn.id} 
                          className={`cursor-pointer hover:shadow-md transition-shadow ${
                            currentCheckIn?.id === checkIn.id ? 'border-micropm-purple' : ''
                          }`}
                          onClick={() => setCurrentCheckIn(checkIn)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">
                                {templates.find(t => t.id === checkIn.templateId)?.title || 'Unknown Template'}
                              </h3>
                              <div className="flex items-center text-micropm-medium-gray">
                                <Calendar size={14} className="mr-1" />
                                <span className="text-xs">{checkIn.date}</span>
                              </div>
                            </div>
                            <p className="text-xs text-micropm-medium-gray">
                              {checkIn.answers.length} answers
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <CalendarDays size={32} className="mx-auto mb-2 text-micropm-medium-gray opacity-40" />
                        <h3 className="font-medium mb-2">No check-ins yet</h3>
                        <p className="text-sm text-micropm-medium-gray mb-4">
                          Start your first check-in to track your progress
                        </p>
                        <Button size="sm" onClick={() => setActiveTab('templates')}>
                          Start Check-in
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Check-in Details */}
                <div className="md:col-span-2">
                  {currentCheckIn ? (
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>
                              {templates.find(t => t.id === currentCheckIn.templateId)?.title || 'Check-in Record'}
                            </CardTitle>
                            <CardDescription className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {currentCheckIn.date}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {currentCheckIn.answers.map((answer, index) => (
                          <div key={index} className="space-y-2">
                            <h3 className="font-semibold text-micropm-purple">
                              {answer.question}
                            </h3>
                            <p className="text-micropm-medium-gray whitespace-pre-line">
                              {answer.answer}
                            </p>
                          </div>
                        ))}
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            const content = currentCheckIn.answers.map(
                              a => `Q: ${a.question}\nA: ${a.answer}\n\n`
                            ).join('');
                            
                            navigator.clipboard.writeText(content);
                            
                            toast({
                              title: "Copied to clipboard",
                              description: "Check-in answers have been copied to your clipboard"
                            });
                          }}
                        >
                          <Copy size={14} className="mr-2" /> Copy to Clipboard
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border h-96 p-6 text-center">
                      <CalendarDays size={48} className="text-micropm-medium-gray mb-4 opacity-40" />
                      <h3 className="text-xl font-bold mb-2">No Check-in Selected</h3>
                      <p className="text-micropm-medium-gray mb-6">
                        Select a check-in from the list to view its details.
                      </p>
                      <Button onClick={() => setActiveTab('templates')}>
                        <ArrowRight size={16} className="mr-2" /> Start New Check-in
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WeeklyCheckin;

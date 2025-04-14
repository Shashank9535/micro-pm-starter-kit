
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MessageSquare, 
  Plus, 
  Star, 
  StarHalf, 
  StarOff,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  Tag,
  Trash,
  Filter,
  MailPlus,
  Archive,
  HelpCircle,
  ArrowUpRight,
  Code
} from "lucide-react";

interface Feedback {
  id: string;
  source: string;
  type: 'feature_request' | 'bug_report' | 'praise' | 'question' | 'other';
  status: 'new' | 'in_progress' | 'completed' | 'rejected' | 'archived';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  rating?: number;
  userEmail?: string;
  userName?: string;
  userRole?: string;
  date: string;
  tags: string[];
}

const sampleFeedback: Feedback[] = [
  {
    id: 'feedback1',
    source: 'In-app feedback',
    type: 'feature_request',
    status: 'new',
    priority: 'medium',
    title: 'Add dark mode support',
    description: 'It would be great to have a dark mode option for those of us who work late at night. The bright white interface can be hard on the eyes.',
    sentiment: 'neutral',
    userEmail: 'alex@example.com',
    userName: 'Alex Chen',
    userRole: 'Product Manager',
    date: '2025-04-10',
    tags: ['ui', 'accessibility']
  },
  {
    id: 'feedback2',
    source: 'Customer support',
    type: 'bug_report',
    status: 'in_progress',
    priority: 'high',
    title: 'Unable to export data as CSV',
    description: 'When I try to export my dashboard data as CSV, the download never starts. This is blocking my weekly reporting.',
    sentiment: 'negative',
    userEmail: 'jordan@example.com',
    userName: 'Jordan Taylor',
    userRole: 'Data Analyst',
    date: '2025-04-09',
    tags: ['export', 'bug']
  },
  {
    id: 'feedback3',
    source: 'NPS survey',
    type: 'praise',
    status: 'completed',
    priority: 'low',
    title: 'Love the new dashboard layout',
    description: 'The new dashboard layout is much more intuitive and helps me find what I need quickly. Great job on the redesign!',
    sentiment: 'positive',
    rating: 5,
    userEmail: 'sam@example.com',
    userName: 'Sam Wilson',
    userRole: 'Marketing Director',
    date: '2025-04-08',
    tags: ['ui', 'dashboard']
  },
  {
    id: 'feedback4',
    source: 'Email',
    type: 'question',
    status: 'new',
    priority: 'medium',
    title: 'How to integrate with Slack?',
    description: 'Is there a way to integrate your tool with our Slack workspace? We\'d like to get notifications in our #product channel.',
    sentiment: 'neutral',
    userEmail: 'chris@example.com',
    userName: 'Chris Johnson',
    userRole: 'Engineering Lead',
    date: '2025-04-07',
    tags: ['integration', 'slack']
  },
  {
    id: 'feedback5',
    source: 'User interview',
    type: 'feature_request',
    status: 'rejected',
    priority: 'low',
    title: 'Add integration with Trello',
    description: 'We use Trello for project management and would love to see an integration that allows us to create cards directly from your tool.',
    sentiment: 'neutral',
    userEmail: 'robin@example.com',
    userName: 'Robin Martinez',
    userRole: 'Project Manager',
    date: '2025-04-06',
    tags: ['integration', 'trello']
  }
];

const FeedbackInbox = () => {
  const [feedback, setFeedback] = useState<Feedback[]>(sampleFeedback);
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'in_progress' | 'completed' | 'archived'>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEmbedDialogOpen, setIsEmbedDialogOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    searchTerm: '',
    type: 'all',
    priority: 'all',
    sentiment: 'all',
    tags: [] as string[]
  });
  
  const [newFeedback, setNewFeedback] = useState<Omit<Feedback, 'id' | 'date'>>({
    source: 'Manual entry',
    type: 'feature_request',
    status: 'new',
    priority: 'medium',
    title: '',
    description: '',
    sentiment: 'neutral',
    tags: []
  });
  
  // Get all unique tags from feedback
  const allTags = [...new Set(feedback.flatMap(f => f.tags))];
  
  const filteredFeedback = feedback.filter(item => {
    // First filter by tab (status)
    if (activeTab !== 'all' && item.status !== activeTab && (activeTab !== 'archived' || item.status !== 'rejected')) {
      return false;
    }
    
    // Then apply additional filters
    const matchesSearch = filters.searchTerm === '' || 
      item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
    const matchesType = filters.type === 'all' || item.type === filters.type;
    const matchesPriority = filters.priority === 'all' || item.priority === filters.priority;
    const matchesSentiment = filters.sentiment === 'all' || item.sentiment === filters.sentiment;
    
    const matchesTags = filters.tags.length === 0 || 
      filters.tags.some(tag => item.tags.includes(tag));
    
    return matchesSearch && matchesType && matchesPriority && matchesSentiment && matchesTags;
  });
  
  const handleAddFeedback = () => {
    if (!newFeedback.title.trim() || !newFeedback.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title and description for the feedback",
        variant: "destructive"
      });
      return;
    }
    
    const addedFeedback: Feedback = {
      ...newFeedback,
      id: `feedback-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    
    setFeedback(prev => [addedFeedback, ...prev]);
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewFeedback({
      source: 'Manual entry',
      type: 'feature_request',
      status: 'new',
      priority: 'medium',
      title: '',
      description: '',
      sentiment: 'neutral',
      tags: []
    });
    
    toast({
      title: "Feedback added",
      description: "The feedback has been added to your inbox"
    });
  };
  
  const updateFeedbackStatus = (id: string, status: Feedback['status']) => {
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, status } : item
    ));
    
    if (selectedFeedback?.id === id) {
      setSelectedFeedback(prev => prev ? { ...prev, status } : null);
    }
    
    const statusText = status === 'in_progress' ? 'in progress' : status;
    
    toast({
      title: "Status updated",
      description: `Feedback has been marked as ${statusText}`
    });
  };
  
  const updateFeedbackPriority = (id: string, priority: Feedback['priority']) => {
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, priority } : item
    ));
    
    if (selectedFeedback?.id === id) {
      setSelectedFeedback(prev => prev ? { ...prev, priority } : null);
    }
    
    toast({
      title: "Priority updated",
      description: `Feedback priority has been set to ${priority}`
    });
  };
  
  const deleteFeedback = (id: string) => {
    setFeedback(prev => prev.filter(item => item.id !== id));
    
    if (selectedFeedback?.id === id) {
      setSelectedFeedback(null);
    }
    
    toast({
      title: "Feedback deleted",
      description: "The feedback has been permanently deleted"
    });
  };
  
  const addTag = (feedbackId: string, tag: string) => {
    if (!tag.trim()) return;
    
    setFeedback(prev => prev.map(item => {
      if (item.id === feedbackId && !item.tags.includes(tag)) {
        return {
          ...item,
          tags: [...item.tags, tag]
        };
      }
      return item;
    }));
    
    if (selectedFeedback?.id === feedbackId) {
      setSelectedFeedback(prev => {
        if (prev && !prev.tags.includes(tag)) {
          return {
            ...prev,
            tags: [...prev.tags, tag]
          };
        }
        return prev;
      });
    }
  };
  
  const removeTag = (feedbackId: string, tag: string) => {
    setFeedback(prev => prev.map(item => {
      if (item.id === feedbackId) {
        return {
          ...item,
          tags: item.tags.filter(t => t !== tag)
        };
      }
      return item;
    }));
    
    if (selectedFeedback?.id === feedbackId) {
      setSelectedFeedback(prev => {
        if (prev) {
          return {
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
          };
        }
        return prev;
      });
    }
  };
  
  const toggleTagFilter = (tag: string) => {
    setFilters(prev => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag]
        };
      }
    });
  };
  
  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      type: 'all',
      priority: 'all',
      sentiment: 'all',
      tags: []
    });
  };

  // For the embed code dialog
  const typeformEmbedCode = `<div class="typeform-widget" data-url="https://form.typeform.com/to/XXXXX" style="width: 100%; height: 500px;"></div>
<script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script>`;

  const tallyEmbedCode = `<iframe src="https://tally.so/embed/XXXXX" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0" title="Feedback Form"></iframe>`;

  const renderSentimentIcon = (sentiment: Feedback['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="text-green-500" />;
      case 'negative':
        return <ThumbsDown className="text-red-500" />;
      default:
        return <StarHalf className="text-yellow-500" />;
    }
  };

  const renderRating = (rating?: number) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} fill="currentColor" className="text-yellow-500" />
        ))}
        {halfStar && <StarHalf key="half" size={16} fill="currentColor" className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} size={16} className="text-gray-300" />
        ))}
      </div>
    );
  };
  
  const tabCounts = {
    all: feedback.length,
    new: feedback.filter(f => f.status === 'new').length,
    in_progress: feedback.filter(f => f.status === 'in_progress').length,
    completed: feedback.filter(f => f.status === 'completed').length,
    archived: feedback.filter(f => f.status === 'rejected' || f.status === 'archived').length
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-10 px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mr-4">
                <MessageSquare className="h-6 w-6 text-micropm-purple" />
              </div>
              <h1 className="text-3xl font-bold">Feedback Inbox</h1>
            </div>
            
            <div className="flex gap-2">
              <Dialog open={isEmbedDialogOpen} onOpenChange={setIsEmbedDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpRight size={16} className="mr-2" /> Embed Form
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Embed Feedback Form</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Tabs defaultValue="typeform">
                      <TabsList className="grid grid-cols-2 w-full mb-4">
                        <TabsTrigger value="typeform">Typeform</TabsTrigger>
                        <TabsTrigger value="tally">Tally</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="typeform" className="space-y-4">
                        <p className="text-sm text-micropm-medium-gray">
                          Typeform is a great tool for creating beautiful, conversational forms. Follow these steps to embed your Typeform:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-micropm-medium-gray">
                          <li>Create your feedback form in Typeform</li>
                          <li>Go to the Share panel and select the Embed tab</li>
                          <li>Copy the embed code and replace "XXXXX" in the code below with your form ID</li>
                        </ol>
                        <div className="mt-4">
                          <Label htmlFor="typeform-code">Typeform Embed Code</Label>
                          <div className="relative mt-2">
                            <Textarea 
                              id="typeform-code" 
                              readOnly
                              value={typeformEmbedCode}
                              className="font-mono text-sm h-32"
                            />
                            <Button
                              className="absolute top-2 right-2"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard.writeText(typeformEmbedCode);
                                toast({
                                  title: "Copied!",
                                  description: "Embed code copied to clipboard"
                                });
                              }}
                            >
                              <Copy size={14} className="mr-2" /> Copy
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tally" className="space-y-4">
                        <p className="text-sm text-micropm-medium-gray">
                          Tally.so is a simple form builder with a clean interface. Follow these steps to embed your Tally form:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-micropm-medium-gray">
                          <li>Create your feedback form in Tally</li>
                          <li>Go to the Share menu and select Embed</li>
                          <li>Copy the embed code and replace "XXXXX" in the code below with your form ID</li>
                        </ol>
                        <div className="mt-4">
                          <Label htmlFor="tally-code">Tally Embed Code</Label>
                          <div className="relative mt-2">
                            <Textarea 
                              id="tally-code" 
                              readOnly
                              value={tallyEmbedCode}
                              className="font-mono text-sm h-32"
                            />
                            <Button
                              className="absolute top-2 right-2"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard.writeText(tallyEmbedCode);
                                toast({
                                  title: "Copied!",
                                  description: "Embed code copied to clipboard"
                                });
                              }}
                            >
                              <Copy size={14} className="mr-2" /> Copy
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus size={16} className="mr-2" /> Add Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Feedback</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="feedback-type">Feedback Type</Label>
                        <select 
                          id="feedback-type"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newFeedback.type}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, type: e.target.value as any }))}
                        >
                          <option value="feature_request">Feature Request</option>
                          <option value="bug_report">Bug Report</option>
                          <option value="praise">Praise</option>
                          <option value="question">Question</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feedback-priority">Priority</Label>
                        <select 
                          id="feedback-priority"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newFeedback.priority}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, priority: e.target.value as any }))}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="feedback-title">Title</Label>
                      <Input 
                        id="feedback-title" 
                        value={newFeedback.title}
                        onChange={(e) => setNewFeedback(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Brief summary of the feedback" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="feedback-description">Description</Label>
                      <Textarea 
                        id="feedback-description" 
                        value={newFeedback.description}
                        onChange={(e) => setNewFeedback(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detailed feedback content" 
                        className="min-h-32"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="feedback-sentiment">Sentiment</Label>
                        <select 
                          id="feedback-sentiment"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newFeedback.sentiment}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, sentiment: e.target.value as any }))}
                        >
                          <option value="positive">Positive</option>
                          <option value="neutral">Neutral</option>
                          <option value="negative">Negative</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feedback-source">Source</Label>
                        <Input 
                          id="feedback-source" 
                          value={newFeedback.source}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, source: e.target.value }))}
                          placeholder="Where did this feedback come from?" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="feedback-user-name">User Name (Optional)</Label>
                        <Input 
                          id="feedback-user-name" 
                          value={newFeedback.userName || ''}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, userName: e.target.value }))}
                          placeholder="Name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feedback-user-email">User Email (Optional)</Label>
                        <Input 
                          id="feedback-user-email" 
                          value={newFeedback.userEmail || ''}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, userEmail: e.target.value }))}
                          placeholder="Email" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feedback-user-role">User Role (Optional)</Label>
                        <Input 
                          id="feedback-user-role" 
                          value={newFeedback.userRole || ''}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, userRole: e.target.value }))}
                          placeholder="Role" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="feedback-tags">Tags (comma separated)</Label>
                      <Input 
                        id="feedback-tags" 
                        value={newFeedback.tags.join(', ')}
                        onChange={(e) => {
                          const tagsValue = e.target.value;
                          const tagsArray = tagsValue
                            .split(',')
                            .map(tag => tag.trim())
                            .filter(tag => tag !== '');
                          setNewFeedback(prev => ({ ...prev, tags: tagsArray }));
                        }}
                        placeholder="e.g., ui, bug, performance" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleAddFeedback}>Add Feedback</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Filter & Feedback List */}
            <div className="md:col-span-1 space-y-4">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="all" className="text-xs">
                    All <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-micropm-soft-gray">{tabCounts.all}</span>
                  </TabsTrigger>
                  <TabsTrigger value="new" className="text-xs">
                    New <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-micropm-soft-gray">{tabCounts.new}</span>
                  </TabsTrigger>
                  <TabsTrigger value="in_progress" className="text-xs">
                    In Progress <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-micropm-soft-gray">{tabCounts.in_progress}</span>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs">
                    Done <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-micropm-soft-gray">{tabCounts.completed}</span>
                  </TabsTrigger>
                  <TabsTrigger value="archived" className="text-xs">
                    Archived <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-micropm-soft-gray">{tabCounts.archived}</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <Input 
                        placeholder="Search feedback..." 
                        value={filters.searchTerm}
                        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="filter-type" className="text-xs">Type</Label>
                        <select 
                          id="filter-type"
                          className="flex h-8 w-full text-xs rounded-md border border-input bg-background px-3 py-1 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={filters.type}
                          onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                        >
                          <option value="all">All Types</option>
                          <option value="feature_request">Feature Request</option>
                          <option value="bug_report">Bug Report</option>
                          <option value="praise">Praise</option>
                          <option value="question">Question</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="filter-priority" className="text-xs">Priority</Label>
                        <select 
                          id="filter-priority"
                          className="flex h-8 w-full text-xs rounded-md border border-input bg-background px-3 py-1 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={filters.priority}
                          onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                        >
                          <option value="all">All Priorities</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs mb-2 block">Tags</Label>
                      <div className="flex flex-wrap gap-1">
                        {allTags.map(tag => (
                          <button
                            key={tag}
                            className={`text-xs px-2 py-1 rounded-full ${
                              filters.tags.includes(tag)
                                ? 'bg-micropm-purple text-white'
                                : 'bg-micropm-soft-gray text-gray-600 hover:bg-gray-200'
                            }`}
                            onClick={() => toggleTagFilter(tag)}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {(filters.searchTerm || filters.type !== 'all' || filters.priority !== 'all' || filters.tags.length > 0) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex w-full justify-center"
                        onClick={clearFilters}
                      >
                        <Filter size={14} className="mr-2" /> Clear Filters
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-3">
                {filteredFeedback.length > 0 ? (
                  filteredFeedback.map(item => (
                    <Card 
                      key={item.id} 
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        selectedFeedback?.id === item.id ? 'border-micropm-purple' : ''
                      }`}
                      onClick={() => setSelectedFeedback(item)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-2 items-center">
                            {item.type === 'feature_request' && <Plus size={16} className="text-blue-500" />}
                            {item.type === 'bug_report' && <Code size={16} className="text-red-500" />}
                            {item.type === 'praise' && <Star size={16} className="text-yellow-500" />}
                            {item.type === 'question' && <HelpCircle size={16} className="text-green-500" />}
                            <h3 className="font-medium line-clamp-1">{item.title}</h3>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.priority === 'high' ? 'bg-red-100 text-red-800' :
                            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-sm text-micropm-medium-gray line-clamp-2 mb-2">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center text-xs text-micropm-medium-gray">
                          <span>{item.source}</span>
                          <span>{item.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MessageSquare size={32} className="mx-auto mb-2 text-micropm-medium-gray opacity-40" />
                      <h3 className="font-medium mb-2">No feedback found</h3>
                      <p className="text-sm text-micropm-medium-gray mb-4">
                        Try adjusting your filters or add new feedback
                      </p>
                      <Button size="sm" onClick={() => clearFilters()}>
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Right Column: Feedback Details */}
            <div className="md:col-span-2">
              {selectedFeedback ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {selectedFeedback.type === 'feature_request' && <Plus size={18} className="text-blue-500" />}
                          {selectedFeedback.type === 'bug_report' && <Code size={18} className="text-red-500" />}
                          {selectedFeedback.type === 'praise' && <Star size={18} className="text-yellow-500" />}
                          {selectedFeedback.type === 'question' && <HelpCircle size={18} className="text-green-500" />}
                          <h2 className="text-xl font-bold">{selectedFeedback.title}</h2>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedFeedback.priority === 'high' ? 'bg-red-100 text-red-800' :
                            selectedFeedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {selectedFeedback.priority} priority
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedFeedback.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            selectedFeedback.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                            selectedFeedback.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedFeedback.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-micropm-medium-gray flex items-center">
                            <Calendar size={12} className="mr-1" /> {selectedFeedback.date}
                          </span>
                        </div>
                      </div>
                      <div>
                        {renderSentimentIcon(selectedFeedback.sentiment)}
                        {renderRating(selectedFeedback.rating)}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-micropm-medium-gray whitespace-pre-line">
                        {selectedFeedback.description}
                      </p>
                    </div>
                    
                    {(selectedFeedback.userName || selectedFeedback.userEmail || selectedFeedback.userRole) && (
                      <div className="mb-6 p-4 bg-micropm-soft-gray rounded-md">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <User size={16} className="mr-2" /> User Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {selectedFeedback.userName && (
                            <div>
                              <h4 className="text-sm font-medium">Name</h4>
                              <p className="text-sm">{selectedFeedback.userName}</p>
                            </div>
                          )}
                          {selectedFeedback.userEmail && (
                            <div>
                              <h4 className="text-sm font-medium">Email</h4>
                              <p className="text-sm">{selectedFeedback.userEmail}</p>
                            </div>
                          )}
                          {selectedFeedback.userRole && (
                            <div>
                              <h4 className="text-sm font-medium">Role</h4>
                              <p className="text-sm">{selectedFeedback.userRole}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold flex items-center">
                          <Tag size={16} className="mr-2" /> Tags
                        </h3>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Plus size={14} className="mr-1" /> Add Tag
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Add Tag</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="new-tag">New Tag</Label>
                                  <div className="flex gap-2">
                                    <Input 
                                      id="new-tag" 
                                      placeholder="Enter a new tag" 
                                    />
                                    <Button onClick={(e) => {
                                      const input = document.getElementById('new-tag') as HTMLInputElement;
                                      if (input && input.value.trim()) {
                                        addTag(selectedFeedback.id, input.value.trim());
                                        input.value = '';
                                      }
                                    }}>
                                      Add
                                    </Button>
                                  </div>
                                </div>
                                
                                {allTags.length > 0 && (
                                  <div>
                                    <Label className="mb-2 block">Existing Tags</Label>
                                    <div className="flex flex-wrap gap-2">
                                      {allTags
                                        .filter(tag => !selectedFeedback.tags.includes(tag))
                                        .map(tag => (
                                          <button
                                            key={tag}
                                            className="text-xs px-2 py-1 rounded-full bg-micropm-soft-gray hover:bg-micropm-soft-gray/80"
                                            onClick={() => addTag(selectedFeedback.id, tag)}
                                          >
                                            {tag}
                                          </button>
                                        ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {selectedFeedback.tags.length > 0 ? (
                          selectedFeedback.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="flex items-center gap-1 text-xs px-3 py-1 bg-micropm-soft-gray rounded-full group"
                            >
                              {tag}
                              <button
                                className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeTag(selectedFeedback.id, tag);
                                }}
                              >
                                <Trash size={12} />
                              </button>
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-micropm-medium-gray">No tags added yet</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Source</h3>
                      <p className="text-micropm-medium-gray">{selectedFeedback.source}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                      <div className="space-y-2">
                        <Label htmlFor="update-status" className="text-sm">Update Status</Label>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant={selectedFeedback.status === 'new' ? 'default' : 'outline'}
                            className={selectedFeedback.status === 'new' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                            onClick={() => updateFeedbackStatus(selectedFeedback.id, 'new')}
                          >
                            New
                          </Button>
                          <Button 
                            size="sm" 
                            variant={selectedFeedback.status === 'in_progress' ? 'default' : 'outline'}
                            className={selectedFeedback.status === 'in_progress' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                            onClick={() => updateFeedbackStatus(selectedFeedback.id, 'in_progress')}
                          >
                            In Progress
                          </Button>
                          <Button 
                            size="sm" 
                            variant={selectedFeedback.status === 'completed' ? 'default' : 'outline'}
                            className={selectedFeedback.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}
                            onClick={() => updateFeedbackStatus(selectedFeedback.id, 'completed')}
                          >
                            Completed
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateFeedbackStatus(selectedFeedback.id, 'archived')}
                        >
                          <Archive size={14} className="mr-2" /> Archive
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteFeedback(selectedFeedback.id)}
                        >
                          <Trash size={14} className="mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border h-96 p-6 text-center">
                  <MessageSquare size={48} className="text-micropm-medium-gray mb-4 opacity-40" />
                  <h3 className="text-xl font-bold mb-2">No Feedback Selected</h3>
                  <p className="text-micropm-medium-gray mb-6">
                    Select feedback from the list to view details, or add new feedback.
                  </p>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <MailPlus size={16} className="mr-2" /> Add New Feedback
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackInbox;

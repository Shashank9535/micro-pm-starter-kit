
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDays, Plus, Edit2, Trash, ArrowLeft, ArrowRight, MoreHorizontal, Download, Save } from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'planned' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | '';
  assignee: string;
}

const RoadmapBoard = () => {
  const [items, setItems] = useState<RoadmapItem[]>([
    {
      id: '1',
      title: 'User Authentication',
      description: 'Implement OAuth login with social providers',
      status: 'completed',
      priority: 'high',
      quarter: 'Q1',
      assignee: 'Alex Chen'
    },
    {
      id: '2',
      title: 'Dashboard Redesign',
      description: 'Revamp the main dashboard with new metrics and widgets',
      status: 'in-progress',
      priority: 'medium',
      quarter: 'Q2',
      assignee: 'Sarah Johnson'
    },
    {
      id: '3',
      title: 'Payment Processing',
      description: 'Add Stripe integration for subscriptions',
      status: 'planned',
      priority: 'high',
      quarter: 'Q2',
      assignee: ''
    },
    {
      id: '4',
      title: 'Mobile Responsive Design',
      description: 'Ensure all screens work on mobile devices',
      status: 'backlog',
      priority: 'medium',
      quarter: 'Q3',
      assignee: ''
    },
    {
      id: '5',
      title: 'Activity Feed',
      description: 'Add a real-time activity feed for team collaboration',
      status: 'backlog',
      priority: 'low',
      quarter: 'Q4',
      assignee: ''
    }
  ]);

  const [newItem, setNewItem] = useState<Omit<RoadmapItem, 'id'>>({
    title: '',
    description: '',
    status: 'backlog',
    priority: 'medium',
    quarter: '',
    assignee: ''
  });

  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddItem = () => {
    if (!newItem.title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for the roadmap item",
        variant: "destructive"
      });
      return;
    }

    const item: RoadmapItem = {
      ...newItem,
      id: `item-${Date.now()}`
    };

    setItems(prev => [...prev, item]);
    setNewItem({
      title: '',
      description: '',
      status: 'backlog',
      priority: 'medium',
      quarter: '',
      assignee: ''
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Item added",
      description: `${item.title} has been added to your roadmap`
    });
  };

  const handleEditItem = () => {
    if (!editingItem) return;
    
    if (!editingItem.title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for the roadmap item",
        variant: "destructive"
      });
      return;
    }

    setItems(prev => prev.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setIsEditDialogOpen(false);

    toast({
      title: "Item updated",
      description: `${editingItem.title} has been updated`
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item deleted",
      description: "The roadmap item has been removed"
    });
  };

  const moveItem = (id: string, direction: 'left' | 'right') => {
    const statusOrder = ['backlog', 'planned', 'in-progress', 'completed'];
    
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const currentStatusIndex = statusOrder.indexOf(item.status);
        let newStatusIndex;
        
        if (direction === 'left' && currentStatusIndex > 0) {
          newStatusIndex = currentStatusIndex - 1;
        } else if (direction === 'right' && currentStatusIndex < statusOrder.length - 1) {
          newStatusIndex = currentStatusIndex + 1;
        } else {
          return item;
        }
        
        return {
          ...item,
          status: statusOrder[newStatusIndex] as RoadmapItem['status']
        };
      }
      return item;
    }));
  };

  const handleEditClick = (item: RoadmapItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const downloadRoadmap = () => {
    // Create formatted content for download
    let content = "# Product Roadmap\n\n";
    
    content += "## Backlog\n\n";
    items.filter(item => item.status === 'backlog').forEach(item => {
      content += `### ${item.title}\n`;
      content += `- Priority: ${item.priority}\n`;
      content += `- Quarter: ${item.quarter || 'Not scheduled'}\n`;
      content += `- Assignee: ${item.assignee || 'Unassigned'}\n\n`;
      content += `${item.description}\n\n`;
    });
    
    content += "## Planned\n\n";
    items.filter(item => item.status === 'planned').forEach(item => {
      content += `### ${item.title}\n`;
      content += `- Priority: ${item.priority}\n`;
      content += `- Quarter: ${item.quarter || 'Not scheduled'}\n`;
      content += `- Assignee: ${item.assignee || 'Unassigned'}\n\n`;
      content += `${item.description}\n\n`;
    });
    
    content += "## In Progress\n\n";
    items.filter(item => item.status === 'in-progress').forEach(item => {
      content += `### ${item.title}\n`;
      content += `- Priority: ${item.priority}\n`;
      content += `- Quarter: ${item.quarter || 'Not scheduled'}\n`;
      content += `- Assignee: ${item.assignee || 'Unassigned'}\n\n`;
      content += `${item.description}\n\n`;
    });
    
    content += "## Completed\n\n";
    items.filter(item => item.status === 'completed').forEach(item => {
      content += `### ${item.title}\n`;
      content += `- Priority: ${item.priority}\n`;
      content += `- Quarter: ${item.quarter || 'Not scheduled'}\n`;
      content += `- Assignee: ${item.assignee || 'Unassigned'}\n\n`;
      content += `${item.description}\n\n`;
    });

    // Create and download the file
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `product-roadmap.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Roadmap downloaded",
      description: "Your roadmap has been downloaded as a Markdown file"
    });
  };

  const saveRoadmap = () => {
    // In a real implementation, this would save to backend
    localStorage.setItem(`roadmap-${Date.now()}`, JSON.stringify(items));
    
    toast({
      title: "Roadmap saved",
      description: "Your roadmap has been saved locally"
    });
  };

  const statusCounts = {
    backlog: items.filter(item => item.status === 'backlog').length,
    planned: items.filter(item => item.status === 'planned').length,
    'in-progress': items.filter(item => item.status === 'in-progress').length,
    completed: items.filter(item => item.status === 'completed').length
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-10 px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mr-4">
                <CalendarDays className="h-6 w-6 text-micropm-purple" />
              </div>
              <h1 className="text-3xl font-bold">Roadmap Board</h1>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={saveRoadmap}>
                <Save size={16} className="mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={downloadRoadmap}>
                <Download size={16} className="mr-2" /> Export
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus size={16} className="mr-2" /> Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add Roadmap Item</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title" 
                        value={newItem.title}
                        onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="E.g., User Authentication" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe this feature or initiative" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select 
                          id="status"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newItem.status}
                          onChange={(e) => setNewItem(prev => ({ ...prev, status: e.target.value as RoadmapItem['status'] }))}
                        >
                          <option value="backlog">Backlog</option>
                          <option value="planned">Planned</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <select 
                          id="priority"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newItem.priority}
                          onChange={(e) => setNewItem(prev => ({ ...prev, priority: e.target.value as RoadmapItem['priority'] }))}
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quarter">Quarter</Label>
                        <select 
                          id="quarter"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newItem.quarter}
                          onChange={(e) => setNewItem(prev => ({ ...prev, quarter: e.target.value as RoadmapItem['quarter'] }))}
                        >
                          <option value="">Not scheduled</option>
                          <option value="Q1">Q1</option>
                          <option value="Q2">Q2</option>
                          <option value="Q3">Q3</option>
                          <option value="Q4">Q4</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assignee">Assignee</Label>
                        <Input 
                          id="assignee" 
                          value={newItem.assignee}
                          onChange={(e) => setNewItem(prev => ({ ...prev, assignee: e.target.value }))}
                          placeholder="Assign to someone" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleAddItem}>Add to Roadmap</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Backlog Column */}
            <div className="space-y-4">
              <div className="rounded-t-md bg-gray-100 p-3">
                <h2 className="font-semibold flex justify-between items-center">
                  Backlog
                  <span className="bg-white text-xs px-2 py-1 rounded-full">
                    {statusCounts.backlog}
                  </span>
                </h2>
              </div>
              <div className="space-y-3">
                {items.filter(item => item.status === 'backlog').map(item => (
                  <Card key={item.id} className="border-l-4 border-l-gray-400">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => moveItem(item.id, 'right')}
                          >
                            <ArrowRight size={14} />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                              >
                                <MoreHorizontal size={14} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[250px]">
                              <div className="flex flex-col gap-2">
                                <Button 
                                  variant="outline" 
                                  className="justify-start" 
                                  onClick={() => handleEditClick(item)}
                                >
                                  <Edit2 size={14} className="mr-2" /> Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50" 
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash size={14} className="mr-2" /> Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        {item.quarter && (
                          <span className="text-xs px-2 py-1 rounded-full bg-micropm-soft-gray">
                            {item.quarter}
                          </span>
                        )}
                        {item.assignee && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                            {item.assignee}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Planned Column */}
            <div className="space-y-4">
              <div className="rounded-t-md bg-blue-100 p-3">
                <h2 className="font-semibold flex justify-between items-center">
                  Planned
                  <span className="bg-white text-xs px-2 py-1 rounded-full">
                    {statusCounts.planned}
                  </span>
                </h2>
              </div>
              <div className="space-y-3">
                {items.filter(item => item.status === 'planned').map(item => (
                  <Card key={item.id} className="border-l-4 border-l-blue-400">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => moveItem(item.id, 'left')}
                          >
                            <ArrowLeft size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => moveItem(item.id, 'right')}
                          >
                            <ArrowRight size={14} />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                              >
                                <MoreHorizontal size={14} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[250px]">
                              <div className="flex flex-col gap-2">
                                <Button 
                                  variant="outline" 
                                  className="justify-start" 
                                  onClick={() => handleEditClick(item)}
                                >
                                  <Edit2 size={14} className="mr-2" /> Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50" 
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash size={14} className="mr-2" /> Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        {item.quarter && (
                          <span className="text-xs px-2 py-1 rounded-full bg-micropm-soft-gray">
                            {item.quarter}
                          </span>
                        )}
                        {item.assignee && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                            {item.assignee}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* In Progress Column */}
            <div className="space-y-4">
              <div className="rounded-t-md bg-purple-100 p-3">
                <h2 className="font-semibold flex justify-between items-center">
                  In Progress
                  <span className="bg-white text-xs px-2 py-1 rounded-full">
                    {statusCounts['in-progress']}
                  </span>
                </h2>
              </div>
              <div className="space-y-3">
                {items.filter(item => item.status === 'in-progress').map(item => (
                  <Card key={item.id} className="border-l-4 border-l-purple-400">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => moveItem(item.id, 'left')}
                          >
                            <ArrowLeft size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => moveItem(item.id, 'right')}
                          >
                            <ArrowRight size={14} />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                              >
                                <MoreHorizontal size={14} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[250px]">
                              <div className="flex flex-col gap-2">
                                <Button 
                                  variant="outline" 
                                  className="justify-start" 
                                  onClick={() => handleEditClick(item)}
                                >
                                  <Edit2 size={14} className="mr-2" /> Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50" 
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash size={14} className="mr-2" /> Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        {item.quarter && (
                          <span className="text-xs px-2 py-1 rounded-full bg-micropm-soft-gray">
                            {item.quarter}
                          </span>
                        )}
                        {item.assignee && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                            {item.assignee}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Completed Column */}
            <div className="space-y-4">
              <div className="rounded-t-md bg-green-100 p-3">
                <h2 className="font-semibold flex justify-between items-center">
                  Completed
                  <span className="bg-white text-xs px-2 py-1 rounded-full">
                    {statusCounts.completed}
                  </span>
                </h2>
              </div>
              <div className="space-y-3">
                {items.filter(item => item.status === 'completed').map(item => (
                  <Card key={item.id} className="border-l-4 border-l-green-400">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => moveItem(item.id, 'left')}
                          >
                            <ArrowLeft size={14} />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                              >
                                <MoreHorizontal size={14} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[250px]">
                              <div className="flex flex-col gap-2">
                                <Button 
                                  variant="outline" 
                                  className="justify-start" 
                                  onClick={() => handleEditClick(item)}
                                >
                                  <Edit2 size={14} className="mr-2" /> Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50" 
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash size={14} className="mr-2" /> Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        {item.quarter && (
                          <span className="text-xs px-2 py-1 rounded-full bg-micropm-soft-gray">
                            {item.quarter}
                          </span>
                        )}
                        {item.assignee && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                            {item.assignee}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Roadmap Item</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input 
                    id="edit-title" 
                    value={editingItem.title}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, title: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea 
                    id="edit-description" 
                    value={editingItem.description}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <select 
                      id="edit-status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={editingItem.status}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, status: e.target.value as RoadmapItem['status'] } : null)}
                    >
                      <option value="backlog">Backlog</option>
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-priority">Priority</Label>
                    <select 
                      id="edit-priority"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={editingItem.priority}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, priority: e.target.value as RoadmapItem['priority'] } : null)}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-quarter">Quarter</Label>
                    <select 
                      id="edit-quarter"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={editingItem.quarter}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, quarter: e.target.value as RoadmapItem['quarter'] } : null)}
                    >
                      <option value="">Not scheduled</option>
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
                      <option value="Q4">Q4</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-assignee">Assignee</Label>
                    <Input 
                      id="edit-assignee" 
                      value={editingItem.assignee}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, assignee: e.target.value } : null)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleEditItem}>Update Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapBoard;

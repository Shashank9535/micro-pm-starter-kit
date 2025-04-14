import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, Copy, Filter, MessageSquare, Plus, Search, Star, Trash, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const FeedbackInbox = () => {
  const [feedbackItems, setFeedbackItems] = useState([
    { id: 1, type: "Bug", title: "Login button not working", description: "The login button on the homepage is not responding when clicked.", status: "Open", priority: "High", votes: 12 },
    { id: 2, type: "Feature Request", title: "Add dark mode", description: "Many users have requested a dark mode option for better usability at night.", status: "In Progress", priority: "Medium", votes: 25 },
    { id: 3, type: "Improvement", title: "Mobile responsiveness", description: "The website is not fully responsive on smaller screens, causing layout issues.", status: "Closed", priority: "Low", votes: 8 },
  ]);

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    type: "Bug",
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
  });

  const filteredFeedback = feedbackItems.filter(item => {
    const statusMatch = selectedStatus === "All" || item.status === selectedStatus;
    const priorityMatch = selectedPriority === "All" || item.priority === selectedPriority;
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && priorityMatch && searchMatch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateFeedback = () => {
    const newId = feedbackItems.length > 0 ? Math.max(...feedbackItems.map(item => item.id)) + 1 : 1;
    const newItem = { ...newFeedback, id: newId, votes: 0 };
    setFeedbackItems(prev => [...prev, newItem]);
    setIsDialogOpen(false);
    setNewFeedback({ type: "Bug", title: "", description: "", status: "Open", priority: "Medium" });
    toast({
      title: "Feedback created!",
      description: "Your feedback has been successfully added to the inbox.",
    });
  };

  const handleDeleteFeedback = (id) => {
    setFeedbackItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Feedback deleted!",
      description: "The feedback has been removed from the inbox.",
    });
  };

  const handleCopyFeedback = (description) => {
    navigator.clipboard.writeText(description);
    toast({
      title: "Feedback copied!",
      description: "The feedback description has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 md:py-20 px-6">
          <div className="container mx-auto">
            <div className="md:flex md:items-center md:justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">Feedback Inbox</h1>
                <p className="text-micropm-medium-gray">
                  Collect, organize, and prioritize user feedback in one place.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Input
                  type="search"
                  placeholder="Search feedback..."
                  className="md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedStatus("All")}>
                      <Check className="mr-2 h-4 w-4" style={{ display: selectedStatus === "All" ? "block" : "none" }} />
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedStatus("Open")}>
                      <Check className="mr-2 h-4 w-4" style={{ display: selectedStatus === "Open" ? "block" : "none" }} />
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedStatus("In Progress")}>
                      <Check className="mr-2 h-4 w-4" style={{ display: selectedStatus === "In Progress" ? "block" : "none" }} />
                      In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedStatus("Closed")}>
                      <Check className="mr-2 h-4 w-4" style={{ display: selectedStatus === "Closed" ? "block" : "none" }} />
                      Closed
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedPriority("All")}>
                      <Check className="mr-2 h-4 w-4" style={{ display: selectedPriority === "All" ? "block" : "none" }} />
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPriority("High")}>
                      <Check className="mr-2 h-4 w-4" style={{ display: selectedPriority === "High" ? "block" : "none" }} />
                      High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPriority("Medium")}>
                      <Check className="mr-2 h-4 w-4" style={{ display: selectedPriority === "Medium" ? "block" : "none" }} />
                      Medium
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPriority("Low")}>
                      <Check className="mr-2 h-4 w-4" style={{ display: selectedPriority === "Low" ? "block" : "none" }} />
                      Low
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Feedback
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Feedback</DialogTitle>
                      <DialogDescription>
                        Create a new feedback item to track user insights.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Type
                        </Label>
                        <Select value={newFeedback.type} onValueChange={(value) => handleInputChange({ target: { name: "type", value } })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bug">Bug</SelectItem>
                            <SelectItem value="Feature Request">Feature Request</SelectItem>
                            <SelectItem value="Improvement">Improvement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input id="title" name="title" value={newFeedback.title} onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right mt-2">
                          Description
                        </Label>
                        <Textarea id="description" name="description" value={newFeedback.description} onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <Select value={newFeedback.status} onValueChange={(value) => handleInputChange({ target: { name: "status", value } })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                          Priority
                        </Label>
                        <Select value={newFeedback.priority} onValueChange={(value) => handleInputChange({ target: { name: "priority", value } })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={handleCreateFeedback}>Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {filteredFeedback.length === 0 ? (
              <div className="text-center py-10">
                <MessageSquare className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                <p className="text-lg text-gray-500">No feedback items found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredFeedback.map(item => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          {item.title}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDeleteFeedback(item.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        <Badge variant="secondary">{item.type}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        {item.description}
                      </p>
                      <Button variant="ghost" size="sm" onClick={() => handleCopyFeedback(item.description)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Feedback
                      </Button>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{item.votes}</span>
                      </div>
                      <div>
                        <Badge>{item.status}</Badge>
                        <Badge>{item.priority}</Badge>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackInbox;


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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, UserPlus, Download, Save, Edit2, Trash, Copy } from "lucide-react";

interface Persona {
  id: string;
  name: string;
  age: string;
  occupation: string;
  income: string;
  location: string;
  education: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  motivations: string[];
  brands: string[];
  photo: string;
}

const samplePersonas: Persona[] = [
  {
    id: 'persona1',
    name: 'Alex Chen',
    age: '28',
    occupation: 'Product Manager',
    income: '$85,000',
    location: 'San Francisco, CA',
    education: "Master's in Business",
    bio: 'Alex is a tech-savvy product manager who works at a mid-sized SaaS company. They are constantly looking for tools to improve team efficiency and product development processes.',
    goals: [
      'Streamline the product development process',
      'Improve team communication',
      'Track product metrics efficiently'
    ],
    frustrations: [
      'Too many disconnected tools',
      'Difficulty gathering and organizing user feedback',
      'Time-consuming status reporting'
    ],
    motivations: [
      'Career advancement',
      'Building products users love',
      'Learning new skills'
    ],
    brands: [
      'Notion',
      'Slack',
      'Figma',
      'Linear'
    ],
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'persona2',
    name: 'Jordan Taylor',
    age: '23',
    occupation: 'Indie Developer',
    income: '$45,000',
    location: 'Austin, TX',
    education: 'Self-taught programmer',
    bio: 'Jordan is a solo developer building their first SaaS product. They handle everything from coding to marketing and need affordable tools that are easy to use without a team.',
    goals: [
      'Launch a profitable side project',
      'Build an audience for their products',
      'Validate product ideas quickly'
    ],
    frustrations: [
      'Limited budget for tools',
      'Overwhelmed by wearing many hats',
      'Difficulty prioritizing features'
    ],
    motivations: [
      'Financial independence',
      'Creating something from scratch',
      'Being part of the indie maker community'
    ],
    brands: [
      'Twitter',
      'Product Hunt',
      'VS Code',
      'Stripe'
    ],
    photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }
];

const UserPersonas = () => {
  const [personas, setPersonas] = useState<Persona[]>(samplePersonas);
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [newPersona, setNewPersona] = useState<Omit<Persona, 'id'>>({
    name: '',
    age: '',
    occupation: '',
    income: '',
    location: '',
    education: '',
    bio: '',
    goals: [''],
    frustrations: [''],
    motivations: [''],
    brands: [''],
    photo: ''
  });
  
  const [activeTab, setActiveTab] = useState('personas');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleAddPersona = () => {
    if (!newPersona.name.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for the persona",
        variant: "destructive"
      });
      return;
    }

    const persona: Persona = {
      ...newPersona,
      id: `persona-${Date.now()}`,
      goals: newPersona.goals.filter(goal => goal.trim() !== ''),
      frustrations: newPersona.frustrations.filter(frustration => frustration.trim() !== ''),
      motivations: newPersona.motivations.filter(motivation => motivation.trim() !== ''),
      brands: newPersona.brands.filter(brand => brand.trim() !== ''),
    };

    setPersonas(prev => [...prev, persona]);
    
    // Reset form
    setNewPersona({
      name: '',
      age: '',
      occupation: '',
      income: '',
      location: '',
      education: '',
      bio: '',
      goals: [''],
      frustrations: [''],
      motivations: [''],
      brands: [''],
      photo: ''
    });
    
    setIsAddDialogOpen(false);

    toast({
      title: "Persona added",
      description: `${persona.name} has been added to your personas`
    });
  };
  
  const handleUpdatePersona = () => {
    if (!currentPersona) return;
    
    if (!currentPersona.name.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for the persona",
        variant: "destructive"
      });
      return;
    }

    setPersonas(prev => prev.map(p => 
      p.id === currentPersona.id ? {
        ...currentPersona,
        goals: currentPersona.goals.filter(goal => goal.trim() !== ''),
        frustrations: currentPersona.frustrations.filter(frustration => frustration.trim() !== ''),
        motivations: currentPersona.motivations.filter(motivation => motivation.trim() !== ''),
        brands: currentPersona.brands.filter(brand => brand.trim() !== ''),
      } : p
    ));
    
    setIsEditMode(false);

    toast({
      title: "Persona updated",
      description: `${currentPersona.name} has been updated`
    });
  };
  
  const handleDeletePersona = (id: string) => {
    setPersonas(prev => prev.filter(p => p.id !== id));
    
    if (currentPersona?.id === id) {
      setCurrentPersona(null);
    }
    
    toast({
      title: "Persona deleted",
      description: "The persona has been removed"
    });
  };
  
  const addListItem = (field: 'goals' | 'frustrations' | 'motivations' | 'brands') => {
    if (isEditMode && currentPersona) {
      setCurrentPersona({
        ...currentPersona,
        [field]: [...currentPersona[field], '']
      });
    } else {
      setNewPersona({
        ...newPersona,
        [field]: [...newPersona[field], '']
      });
    }
  };
  
  const updateListItem = (field: 'goals' | 'frustrations' | 'motivations' | 'brands', index: number, value: string) => {
    if (isEditMode && currentPersona) {
      const updatedItems = [...currentPersona[field]];
      updatedItems[index] = value;
      setCurrentPersona({
        ...currentPersona,
        [field]: updatedItems
      });
    } else {
      const updatedItems = [...newPersona[field]];
      updatedItems[index] = value;
      setNewPersona({
        ...newPersona,
        [field]: updatedItems
      });
    }
  };
  
  const removeListItem = (field: 'goals' | 'frustrations' | 'motivations' | 'brands', index: number) => {
    if (isEditMode && currentPersona) {
      const updatedItems = [...currentPersona[field]];
      updatedItems.splice(index, 1);
      setCurrentPersona({
        ...currentPersona,
        [field]: updatedItems
      });
    } else {
      const updatedItems = [...newPersona[field]];
      updatedItems.splice(index, 1);
      setNewPersona({
        ...newPersona,
        [field]: updatedItems
      });
    }
  };
  
  const savePersonas = () => {
    // In a real implementation, this would save to backend
    localStorage.setItem('user-personas', JSON.stringify(personas));
    
    toast({
      title: "Personas saved",
      description: "Your personas have been saved locally"
    });
  };

  const downloadPersona = (persona: Persona) => {
    // Create formatted content for download
    let content = `# ${persona.name} - User Persona\n\n`;
    
    content += `**Age:** ${persona.age}\n`;
    content += `**Occupation:** ${persona.occupation}\n`;
    content += `**Income:** ${persona.income}\n`;
    content += `**Location:** ${persona.location}\n`;
    content += `**Education:** ${persona.education}\n\n`;
    
    content += `## Biography\n\n${persona.bio}\n\n`;
    
    content += `## Goals\n\n`;
    persona.goals.forEach(goal => {
      content += `- ${goal}\n`;
    });
    content += '\n';
    
    content += `## Frustrations\n\n`;
    persona.frustrations.forEach(frustration => {
      content += `- ${frustration}\n`;
    });
    content += '\n';
    
    content += `## Motivations\n\n`;
    persona.motivations.forEach(motivation => {
      content += `- ${motivation}\n`;
    });
    content += '\n';
    
    content += `## Preferred Brands\n\n`;
    persona.brands.forEach(brand => {
      content += `- ${brand}\n`;
    });
    
    // Create and download the file
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${persona.name.toLowerCase().replace(/\s+/g, '-')}-persona.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Persona downloaded",
      description: `${persona.name} persona has been downloaded as a Markdown file`
    });
  };

  const downloadAllPersonas = () => {
    // Create formatted content for download
    let content = `# User Personas\n\n`;
    
    personas.forEach((persona, index) => {
      content += `## ${persona.name}\n\n`;
      
      content += `**Age:** ${persona.age}\n`;
      content += `**Occupation:** ${persona.occupation}\n`;
      content += `**Income:** ${persona.income}\n`;
      content += `**Location:** ${persona.location}\n`;
      content += `**Education:** ${persona.education}\n\n`;
      
      content += `### Biography\n\n${persona.bio}\n\n`;
      
      content += `### Goals\n\n`;
      persona.goals.forEach(goal => {
        content += `- ${goal}\n`;
      });
      content += '\n';
      
      content += `### Frustrations\n\n`;
      persona.frustrations.forEach(frustration => {
        content += `- ${frustration}\n`;
      });
      content += '\n';
      
      content += `### Motivations\n\n`;
      persona.motivations.forEach(motivation => {
        content += `- ${motivation}\n`;
      });
      content += '\n';
      
      content += `### Preferred Brands\n\n`;
      persona.brands.forEach(brand => {
        content += `- ${brand}\n`;
      });
      
      if (index < personas.length - 1) {
        content += '\n---\n\n';
      }
    });
    
    // Create and download the file
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `user-personas.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "All personas downloaded",
      description: "All personas have been downloaded as a single Markdown file"
    });
  };

  const copyPersonaToClipboard = (persona: Persona) => {
    // Create formatted content for clipboard
    let content = `# ${persona.name} - User Persona\n\n`;
    
    content += `**Age:** ${persona.age}\n`;
    content += `**Occupation:** ${persona.occupation}\n`;
    content += `**Income:** ${persona.income}\n`;
    content += `**Location:** ${persona.location}\n`;
    content += `**Education:** ${persona.education}\n\n`;
    
    content += `## Biography\n\n${persona.bio}\n\n`;
    
    content += `## Goals\n\n`;
    persona.goals.forEach(goal => {
      content += `- ${goal}\n`;
    });
    content += '\n';
    
    content += `## Frustrations\n\n`;
    persona.frustrations.forEach(frustration => {
      content += `- ${frustration}\n`;
    });
    content += '\n';
    
    content += `## Motivations\n\n`;
    persona.motivations.forEach(motivation => {
      content += `- ${motivation}\n`;
    });
    content += '\n';
    
    content += `## Preferred Brands\n\n`;
    persona.brands.forEach(brand => {
      content += `- ${brand}\n`;
    });
    
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${persona.name} persona has been copied to your clipboard in Markdown format`
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
                <Users className="h-6 w-6 text-micropm-purple" />
              </div>
              <h1 className="text-3xl font-bold">User Personas</h1>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={savePersonas}>
                <Save size={16} className="mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={downloadAllPersonas}>
                <Download size={16} className="mr-2" /> Export All
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus size={16} className="mr-2" /> Create Persona
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Persona</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={newPersona.name}
                          onChange={(e) => setNewPersona(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Alex Chen" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age" 
                          value={newPersona.age}
                          onChange={(e) => setNewPersona(prev => ({ ...prev, age: e.target.value }))}
                          placeholder="e.g., 28" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input 
                          id="occupation" 
                          value={newPersona.occupation}
                          onChange={(e) => setNewPersona(prev => ({ ...prev, occupation: e.target.value }))}
                          placeholder="e.g., Product Manager" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="income">Income</Label>
                        <Input 
                          id="income" 
                          value={newPersona.income}
                          onChange={(e) => setNewPersona(prev => ({ ...prev, income: e.target.value }))}
                          placeholder="e.g., $85,000" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={newPersona.location}
                          onChange={(e) => setNewPersona(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="e.g., San Francisco, CA" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Input 
                          id="education" 
                          value={newPersona.education}
                          onChange={(e) => setNewPersona(prev => ({ ...prev, education: e.target.value }))}
                          placeholder="e.g., Master's in Business" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo URL (optional)</Label>
                      <Input 
                        id="photo" 
                        value={newPersona.photo}
                        onChange={(e) => setNewPersona(prev => ({ ...prev, photo: e.target.value }))}
                        placeholder="https://example.com/image.jpg" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea 
                        id="bio" 
                        value={newPersona.bio}
                        onChange={(e) => setNewPersona(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Describe who this person is, their background, and typical behaviors." 
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    {/* Goals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Goals</Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => addListItem('goals')}
                        >
                          Add Goal
                        </Button>
                      </div>
                      {newPersona.goals.map((goal, index) => (
                        <div key={`goal-${index}`} className="flex gap-2">
                          <Input 
                            value={goal}
                            onChange={(e) => updateListItem('goals', index, e.target.value)}
                            placeholder="What does this person want to achieve?"
                          />
                          {newPersona.goals.length > 1 && (
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="outline" 
                              onClick={() => removeListItem('goals', index)}
                              className="shrink-0"
                            >
                              <Trash size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Frustrations */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Frustrations</Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => addListItem('frustrations')}
                        >
                          Add Frustration
                        </Button>
                      </div>
                      {newPersona.frustrations.map((frustration, index) => (
                        <div key={`frustration-${index}`} className="flex gap-2">
                          <Input 
                            value={frustration}
                            onChange={(e) => updateListItem('frustrations', index, e.target.value)}
                            placeholder="What problems or pain points does this person face?"
                          />
                          {newPersona.frustrations.length > 1 && (
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="outline" 
                              onClick={() => removeListItem('frustrations', index)}
                              className="shrink-0"
                            >
                              <Trash size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Motivations */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Motivations</Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => addListItem('motivations')}
                        >
                          Add Motivation
                        </Button>
                      </div>
                      {newPersona.motivations.map((motivation, index) => (
                        <div key={`motivation-${index}`} className="flex gap-2">
                          <Input 
                            value={motivation}
                            onChange={(e) => updateListItem('motivations', index, e.target.value)}
                            placeholder="What drives or motivates this person?"
                          />
                          {newPersona.motivations.length > 1 && (
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="outline" 
                              onClick={() => removeListItem('motivations', index)}
                              className="shrink-0"
                            >
                              <Trash size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Brands */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Preferred Brands/Products</Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => addListItem('brands')}
                        >
                          Add Brand
                        </Button>
                      </div>
                      {newPersona.brands.map((brand, index) => (
                        <div key={`brand-${index}`} className="flex gap-2">
                          <Input 
                            value={brand}
                            onChange={(e) => updateListItem('brands', index, e.target.value)}
                            placeholder="What brands or products does this person use and like?"
                          />
                          {newPersona.brands.length > 1 && (
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="outline" 
                              onClick={() => removeListItem('brands', index)}
                              className="shrink-0"
                            >
                              <Trash size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleAddPersona}>Create Persona</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 max-w-md mb-8">
              <TabsTrigger value="personas">Personas</TabsTrigger>
              <TabsTrigger value="journey-map">Journey Map</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personas" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Persona List */}
                <div className="md:col-span-1 space-y-4">
                  <h2 className="text-xl font-bold mb-4">Your Personas</h2>
                  <div className="rounded-lg border overflow-hidden">
                    <div className="p-0">
                      {personas.map((persona) => (
                        <button
                          key={persona.id}
                          className={`w-full flex items-center gap-4 p-4 hover:bg-micropm-soft-gray text-left border-b last:border-b-0 ${
                            currentPersona?.id === persona.id ? 'bg-micropm-soft-gray' : ''
                          }`}
                          onClick={() => {
                            setCurrentPersona(persona);
                            setIsEditMode(false);
                          }}
                        >
                          {persona.photo ? (
                            <img 
                              src={persona.photo} 
                              alt={persona.name} 
                              className="w-10 h-10 rounded-full object-cover" 
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-micropm-purple flex items-center justify-center text-white">
                              {persona.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{persona.name}</h3>
                            <p className="text-sm text-micropm-medium-gray">{persona.occupation}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column: Persona Details */}
                <div className="md:col-span-2">
                  {currentPersona ? (
                    <Card>
                      <CardContent className="p-6">
                        {!isEditMode ? (
                          <>
                            <div className="flex justify-between items-start mb-6">
                              <div className="flex items-center gap-4">
                                {currentPersona.photo ? (
                                  <img 
                                    src={currentPersona.photo} 
                                    alt={currentPersona.name} 
                                    className="w-16 h-16 rounded-full object-cover" 
                                  />
                                ) : (
                                  <div className="w-16 h-16 rounded-full bg-micropm-purple flex items-center justify-center text-white text-xl">
                                    {currentPersona.name.charAt(0)}
                                  </div>
                                )}
                                <div>
                                  <h2 className="text-2xl font-bold">{currentPersona.name}</h2>
                                  <p className="text-micropm-medium-gray">{currentPersona.occupation}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => setIsEditMode(true)}
                                >
                                  <Edit2 size={14} className="mr-2" /> Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                                  onClick={() => handleDeletePersona(currentPersona.id)}
                                >
                                  <Trash size={14} className="mr-2" /> Delete
                                </Button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div>
                                <h3 className="font-semibold text-sm text-micropm-medium-gray">Age</h3>
                                <p>{currentPersona.age}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm text-micropm-medium-gray">Income</h3>
                                <p>{currentPersona.income}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm text-micropm-medium-gray">Location</h3>
                                <p>{currentPersona.location}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm text-micropm-medium-gray">Education</h3>
                                <p>{currentPersona.education}</p>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="font-semibold mb-2">Biography</h3>
                              <p className="text-micropm-medium-gray">{currentPersona.bio}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-semibold mb-2">Goals</h3>
                                <ul className="space-y-2">
                                  {currentPersona.goals.map((goal, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="rounded-full bg-green-100 text-green-800 h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">
                                        ✓
                                      </div>
                                      <span>{goal}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold mb-2">Frustrations</h3>
                                <ul className="space-y-2">
                                  {currentPersona.frustrations.map((frustration, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="rounded-full bg-red-100 text-red-800 h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">
                                        ✗
                                      </div>
                                      <span>{frustration}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold mb-2">Motivations</h3>
                                <ul className="space-y-2">
                                  {currentPersona.motivations.map((motivation, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="rounded-full bg-blue-100 text-blue-800 h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">
                                        ↑
                                      </div>
                                      <span>{motivation}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold mb-2">Preferred Brands</h3>
                                <div className="flex flex-wrap gap-2">
                                  {currentPersona.brands.map((brand, index) => (
                                    <span 
                                      key={index} 
                                      className="px-3 py-1 bg-micropm-soft-gray rounded-full text-sm"
                                    >
                                      {brand}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-8">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => downloadPersona(currentPersona)}
                              >
                                <Download size={14} className="mr-2" /> Download
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => copyPersonaToClipboard(currentPersona)}
                              >
                                <Copy size={14} className="mr-2" /> Copy to Clipboard
                              </Button>
                            </div>
                          </>
                        ) : (
                          // Edit Mode
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input 
                                  id="edit-name" 
                                  value={currentPersona.name}
                                  onChange={(e) => setCurrentPersona(prev => prev ? { ...prev, name: e.target.value } : null)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-age">Age</Label>
                                <Input 
                                  id="edit-age" 
                                  value={currentPersona.age}
                                  onChange={(e) => setCurrentPersona(prev => prev ? { ...prev, age: e.target.value } : null)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-occupation">Occupation</Label>
                                <Input 
                                  id="edit-occupation" 
                                  value={currentPersona.occupation}
                                  onChange={(e) => setCurrentPersona(prev => prev ? { ...prev, occupation: e.target.value } : null)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-income">Income</Label>
                                <Input 
                                  id="edit-income" 
                                  value={currentPersona.income}
                                  onChange={(e) => setCurrentPersona(prev => prev ? { ...prev, income: e.target.value } : null)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-location">Location</Label>
                                <Input 
                                  id="edit-location" 
                                  value={currentPersona.location}
                                  onChange={(e) => setCurrentPersona(prev => prev ? { ...prev, location: e.target.value } : null)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-education">Education</Label>
                                <Input 
                                  id="edit-education" 
                                  value={currentPersona.education}
                                  onChange={(e) => setCurrentPersona(prev => prev ? { ...prev, education: e.target.value } : null)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-photo">Photo URL (optional)</Label>
                              <Input 
                                id="edit-photo" 
                                value={currentPersona.photo}
                                onChange={(e) => setCurrentPersona(prev => prev ? { ...prev, photo: e.target.value } : null)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-bio">Biography</Label>
                              <Textarea 
                                id="edit-bio" 
                                value={currentPersona.bio}
                                onChange={(e) => setCurrentPersona(prev => prev ? { ...prev, bio: e.target.value } : null)}
                                className="min-h-[100px]"
                              />
                            </div>
                            
                            {/* Goals */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label>Goals</Label>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => addListItem('goals')}
                                >
                                  Add Goal
                                </Button>
                              </div>
                              {currentPersona.goals.map((goal, index) => (
                                <div key={`goal-edit-${index}`} className="flex gap-2">
                                  <Input 
                                    value={goal}
                                    onChange={(e) => updateListItem('goals', index, e.target.value)}
                                  />
                                  {currentPersona.goals.length > 1 && (
                                    <Button 
                                      type="button" 
                                      size="icon" 
                                      variant="outline" 
                                      onClick={() => removeListItem('goals', index)}
                                      className="shrink-0"
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            {/* Frustrations */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label>Frustrations</Label>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => addListItem('frustrations')}
                                >
                                  Add Frustration
                                </Button>
                              </div>
                              {currentPersona.frustrations.map((frustration, index) => (
                                <div key={`frustration-edit-${index}`} className="flex gap-2">
                                  <Input 
                                    value={frustration}
                                    onChange={(e) => updateListItem('frustrations', index, e.target.value)}
                                  />
                                  {currentPersona.frustrations.length > 1 && (
                                    <Button 
                                      type="button" 
                                      size="icon" 
                                      variant="outline" 
                                      onClick={() => removeListItem('frustrations', index)}
                                      className="shrink-0"
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            {/* Motivations */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label>Motivations</Label>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => addListItem('motivations')}
                                >
                                  Add Motivation
                                </Button>
                              </div>
                              {currentPersona.motivations.map((motivation, index) => (
                                <div key={`motivation-edit-${index}`} className="flex gap-2">
                                  <Input 
                                    value={motivation}
                                    onChange={(e) => updateListItem('motivations', index, e.target.value)}
                                  />
                                  {currentPersona.motivations.length > 1 && (
                                    <Button 
                                      type="button" 
                                      size="icon" 
                                      variant="outline" 
                                      onClick={() => removeListItem('motivations', index)}
                                      className="shrink-0"
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            {/* Brands */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label>Preferred Brands/Products</Label>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => addListItem('brands')}
                                >
                                  Add Brand
                                </Button>
                              </div>
                              {currentPersona.brands.map((brand, index) => (
                                <div key={`brand-edit-${index}`} className="flex gap-2">
                                  <Input 
                                    value={brand}
                                    onChange={(e) => updateListItem('brands', index, e.target.value)}
                                  />
                                  {currentPersona.brands.length > 1 && (
                                    <Button 
                                      type="button" 
                                      size="icon" 
                                      variant="outline" 
                                      onClick={() => removeListItem('brands', index)}
                                      className="shrink-0"
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-end gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                onClick={() => setIsEditMode(false)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleUpdatePersona}>
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border h-96 p-6 text-center">
                      <Users size={48} className="text-micropm-medium-gray mb-4 opacity-40" />
                      <h3 className="text-xl font-bold mb-2">No Persona Selected</h3>
                      <p className="text-micropm-medium-gray mb-6">
                        Select a persona from the list to view details, or create a new one.
                      </p>
                      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <UserPlus size={16} className="mr-2" /> Create New Persona
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="journey-map" className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-xl font-bold mb-2">Journey Map Coming Soon</h3>
                    <p className="text-micropm-medium-gray mb-6 max-w-md">
                      The user journey mapping tool is currently in development. Check back soon for the ability to map out your user's experience.
                    </p>
                    <Button>Get Notified When Available</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserPersonas;

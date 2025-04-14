import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, ClipboardCheck, FileText, MessageSquare, Users, Zap } from "lucide-react";
import ZapierForm from "@/components/ZapierForm";

const Tools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 md:py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Management Tools</h1>
              <p className="text-lg text-micropm-medium-gray">
                Everything you need to define, build, and grow your product — all in one place.
              </p>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 max-w-3xl mx-auto mb-10">
                <TabsTrigger value="all">All Tools</TabsTrigger>
                <TabsTrigger value="prd">PRD</TabsTrigger>
                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                <TabsTrigger value="personas">Personas</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <FileText className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>PRD Builder</CardTitle>
                      <CardDescription>Create structured product requirement documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Product vision and goals</li>
                        <li>• Feature specifications</li>
                        <li>• Success metrics</li>
                        <li>• Implementation timeline</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <CalendarDays className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>Roadmap Board</CardTitle>
                      <CardDescription>Visualize your product journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Kanban-style planning</li>
                        <li>• Feature prioritization</li>
                        <li>• Release tracking</li>
                        <li>• Timeline visualization</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <Users className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>User Persona Templates</CardTitle>
                      <CardDescription>Define and understand your audience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Detailed user profiles</li>
                        <li>• Goals and pain points</li>
                        <li>• Behavior patterns</li>
                        <li>• Journey mapping</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <ClipboardCheck className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>Interview & Survey Templates</CardTitle>
                      <CardDescription>Gather valuable user insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Interview scripts</li>
                        <li>• User testing templates</li>
                        <li>• Survey question banks</li>
                        <li>• Feedback analysis</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <MessageSquare className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>Feedback Inbox System</CardTitle>
                      <CardDescription>Collect and organize user feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Typeform/Tally embeds</li>
                        <li>• Feedback categorization</li>
                        <li>• Sentiment analysis</li>
                        <li>• Feature request tracking</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <Zap className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>Weekly Check-in System</CardTitle>
                      <CardDescription>Stay on track with automated prompts</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-0">
                      <ZapierForm />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="prd" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <FileText className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>PRD Builder</CardTitle>
                      <CardDescription>Create structured product requirement documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Product vision and goals</li>
                        <li>• Feature specifications</li>
                        <li>• Success metrics</li>
                        <li>• Implementation timeline</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="roadmap" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <CalendarDays className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>Roadmap Board</CardTitle>
                      <CardDescription>Visualize your product journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Kanban-style planning</li>
                        <li>• Feature prioritization</li>
                        <li>• Release tracking</li>
                        <li>• Timeline visualization</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="personas" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <Users className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>User Persona Templates</CardTitle>
                      <CardDescription>Define and understand your audience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Detailed user profiles</li>
                        <li>• Goals and pain points</li>
                        <li>• Behavior patterns</li>
                        <li>• Journey mapping</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="research" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <ClipboardCheck className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>Interview & Survey Templates</CardTitle>
                      <CardDescription>Gather valuable user insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Interview scripts</li>
                        <li>• User testing templates</li>
                        <li>• Survey question banks</li>
                        <li>• Feedback analysis</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="feedback" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <MessageSquare className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>Feedback Inbox System</CardTitle>
                      <CardDescription>Collect and organize user feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-micropm-medium-gray">
                        <li>• Typeform/Tally embeds</li>
                        <li>• Feedback categorization</li>
                        <li>• Sentiment analysis</li>
                        <li>• Feature request tracking</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full micropm-btn-outline">
                        View Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-3">
                        <Zap className="h-6 w-6 text-micropm-purple" />
                      </div>
                      <CardTitle>Weekly Check-in System</CardTitle>
                      <CardDescription>Stay on track with automated prompts</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-0">
                      <ZapierForm />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;

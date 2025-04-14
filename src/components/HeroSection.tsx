
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-micropm-soft-gray rounded-bl-full opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-micropm-soft-gray rounded-tr-full opacity-50 -z-10"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Product Management <span className="text-micropm-purple">Made Simple</span>
            </h1>
            <p className="text-lg md:text-xl text-micropm-medium-gray mb-8 max-w-xl">
              MicroPM gives student founders, indie hackers, and early PMs the tools to organize product workflows in minutes, without any PM experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="micropm-btn" size="lg">
                Get Started Free
              </Button>
              <Button variant="outline" className="micropm-btn-outline" size="lg">
                <span>See How It Works</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-6 text-sm text-micropm-medium-gray">
              No credit card required. Free starter pack available instantly.
            </p>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 border border-micropm-soft-gray">
              <h3 className="font-bold text-xl mb-6 flex items-center">
                <div className="h-6 w-6 rounded-md bg-micropm-purple flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">μ</span>
                </div>
                Product Management Kit
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-micropm-soft-gray rounded-lg flex items-start">
                  <div className="bg-white p-2 rounded-md shadow-sm mr-3">
                    <div className="h-4 w-4 bg-micropm-purple rounded-sm"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">PRD Builder</h4>
                    <p className="text-sm text-micropm-medium-gray">Create structured product requirements</p>
                  </div>
                </div>
                
                <div className="p-4 bg-micropm-soft-gray rounded-lg flex items-start">
                  <div className="bg-white p-2 rounded-md shadow-sm mr-3">
                    <div className="h-4 w-4 bg-micropm-light-purple rounded-sm"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Roadmap Board</h4>
                    <p className="text-sm text-micropm-medium-gray">Visualize your product journey</p>
                  </div>
                </div>
                
                <div className="p-4 bg-micropm-soft-gray rounded-lg flex items-start">
                  <div className="bg-white p-2 rounded-md shadow-sm mr-3">
                    <div className="h-4 w-4 bg-micropm-bright-blue rounded-sm"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">User Journey Maps</h4>
                    <p className="text-sm text-micropm-medium-gray">Map customer experiences</p>
                  </div>
                </div>

                <Link to="/tools" className="text-micropm-purple font-medium flex items-center hover:underline">
                  See all tools
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-micropm-light-purple opacity-20 rounded-full -z-10"></div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-micropm-purple opacity-10 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

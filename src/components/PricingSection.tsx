
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-micropm-medium-gray">
            Get started for free or upgrade to unlock premium features and PM coaching.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="border border-micropm-soft-gray rounded-xl p-8 bg-white">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Starter Pack</h3>
              <p className="text-micropm-medium-gray">Perfect for first-time product builders</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">Free</span>
                <span className="text-micropm-medium-gray ml-2">forever</span>
              </div>
              <p className="text-sm text-micropm-medium-gray mt-2">No credit card required</p>
            </div>
            
            <Button className="w-full mb-8 bg-micropm-soft-gray text-micropm-dark-gray hover:bg-micropm-soft-gray hover:bg-opacity-80">
              Get Started
            </Button>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>PRD Builder (Basic Templates)</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Simple Roadmap Board</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>1 User Persona Template</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Basic Interview Script</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Community Support</span>
              </div>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="border-2 border-micropm-purple rounded-xl p-8 bg-white relative shadow-lg">
            <div className="absolute top-0 right-0 bg-micropm-purple text-white text-sm font-medium py-1 px-3 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Pro Pack</h3>
              <p className="text-micropm-medium-gray">For serious product builders</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-micropm-medium-gray ml-2">/month</span>
              </div>
              <p className="text-sm text-micropm-medium-gray mt-2">Or $290/year (save $58)</p>
            </div>
            
            <Button className="w-full mb-8 micropm-btn">
              Upgrade to Pro
            </Button>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span><span className="font-semibold">Everything in Free</span>, plus:</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Advanced PRD Builder (All Templates)</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Advanced Roadmap Board with Analytics</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Unlimited User Personas & Journey Maps</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Feedback Inbox with Integrations</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Monthly PM Coaching & Review Calls</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-micropm-purple mr-3 mt-0.5" />
                <span>Priority Email Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

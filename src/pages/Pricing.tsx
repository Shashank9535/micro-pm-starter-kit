
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What's included in the free starter pack?",
    answer: "The free starter pack includes basic templates for PRD building, a simple roadmap board, one user persona template, and a basic interview script. It's perfect for individuals who are just getting started with product management."
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can upgrade to the Pro plan at any time to access all features. If you need to downgrade, you can switch back to the Free plan at the end of your billing period."
  },
  {
    question: "How do the PM coaching calls work?",
    answer: "Pro plan subscribers receive monthly 30-minute product management coaching calls with experienced PMs who can review your work, provide feedback, and help you improve your product strategy."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, there are no hidden fees. The pricing is transparent - Free for the starter pack and $29/month (or $290/year) for the Pro plan with all features included."
  },
  {
    question: "Can I use MicroPM for my team?",
    answer: "Yes! While MicroPM is designed for individual product managers and founders, teams can use it collaboratively. Each team member would need their own account to access all features."
  },
  {
    question: "How do I integrate Zapier for weekly check-ins?",
    answer: "The Pro plan includes a simple Zapier integration. We provide you with ready-to-use Zap templates that connect to your email or task management system to send you weekly product development prompts."
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 px-6 bg-micropm-soft-gray">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-lg text-micropm-medium-gray max-w-2xl mx-auto">
              Choose the plan that's right for you. Start free and upgrade when you're ready.
            </p>
          </div>
        </section>
        
        <PricingSection />
        
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-micropm-medium-gray">
                Find answers to common questions about MicroPM and our pricing plans.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="text-center mt-12">
              <h3 className="text-lg font-semibold mb-4">Still have questions?</h3>
              <p className="text-micropm-medium-gray mb-6">
                We're here to help you get the most out of MicroPM.
              </p>
              <div className="flex justify-center">
                <a href="#" className="micropm-btn-outline inline-block">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

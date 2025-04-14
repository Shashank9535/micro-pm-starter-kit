
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="bg-micropm-purple rounded-2xl p-10 md:p-16 text-center md:text-left relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-micropm-light-purple opacity-20 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 md:max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Supercharge Your Product Development?
            </h2>
            <p className="text-lg text-white opacity-90 mb-8">
              Join hundreds of founders who've transformed their product management workflow with MicroPM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-white text-micropm-purple hover:bg-opacity-90">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

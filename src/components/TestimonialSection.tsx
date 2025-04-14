
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    content: "MicroPM helped me go from idea to product launch in just 3 weeks. The templates saved me countless hours of research and planning.",
    author: "Alex Chen",
    position: "Indie Developer",
    avatar: "AC"
  },
  {
    content: "As a student founder, I had no clue how to validate my product ideas properly. MicroPM gave me a structured approach that made all the difference.",
    author: "Sarah Johnson",
    position: "Student Founder",
    avatar: "SJ"
  },
  {
    content: "The roadmap board and PRD templates have become essential to our early-stage startup. Simple yet powerful tools that grow with us.",
    author: "Michael Torres",
    position: "Startup Co-founder",
    avatar: "MT"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 px-6 bg-micropm-soft-gray">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-lg text-micropm-medium-gray">
            Join hundreds of founders and product managers who've transformed their product development process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-sm border border-micropm-soft-gray"
            >
              <div className="mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-micropm-purple opacity-20"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              
              <p className="text-micropm-dark-gray mb-6">{testimonial.content}</p>
              
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src="" alt={testimonial.author} />
                  <AvatarFallback className="bg-micropm-purple text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-micropm-medium-gray">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

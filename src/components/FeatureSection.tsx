
import { 
  CalendarDays, 
  ClipboardCheck, 
  FileText, 
  MessageSquare, 
  Users, 
  Zap
} from "lucide-react";

const features = [
  {
    icon: <FileText className="h-6 w-6 text-micropm-purple" />,
    title: "PRD Builder",
    description: "Create structured product requirement documents with customizable templates to define your product vision, goals, and features."
  },
  {
    icon: <CalendarDays className="h-6 w-6 text-micropm-purple" />,
    title: "Roadmap Board",
    description: "Visualize your product journey with a drag-and-drop Kanban board to plan, prioritize, and track your features and releases."
  },
  {
    icon: <Users className="h-6 w-6 text-micropm-purple" />,
    title: "User Persona Templates",
    description: "Define and understand your target audience with comprehensive user persona and journey mapping templates."
  },
  {
    icon: <ClipboardCheck className="h-6 w-6 text-micropm-purple" />,
    title: "Interview & Survey Templates",
    description: "Gather valuable user insights with ready-to-use interview scripts and survey form templates."
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-micropm-purple" />,
    title: "Feedback Inbox System",
    description: "Collect and organize user feedback with an inbox system that supports Tally or Typeform embeds."
  },
  {
    icon: <Zap className="h-6 w-6 text-micropm-purple" />,
    title: "Weekly Check-in Prompts",
    description: "Stay on track with automated async check-in prompts via Zapier and email to maintain momentum."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 px-6 bg-micropm-soft-gray">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">All the Product Management Tools You Need</h2>
          <p className="text-lg text-micropm-medium-gray">
            MicroPM provides all the essential tools to help you define, build, and grow your product without any prior PM experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-sm border border-micropm-soft-gray hover:shadow-md transition-all duration-300"
            >
              <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-micropm-medium-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

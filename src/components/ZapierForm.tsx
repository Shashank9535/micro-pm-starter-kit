
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  webhookUrl: z.string().url("Please enter a valid Zapier webhook URL"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

const ZapierForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      webhookUrl: "",
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      console.log("Triggering Zapier webhook with:", values);
      
      // In a real implementation, we would send the data to the Zapier webhook
      await fetch(values.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          timestamp: new Date().toISOString(),
          source: "MicroPM Weekly Check-in",
        }),
      });
      
      toast({
        title: "Success!",
        description: "You've been signed up for weekly check-in prompts.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to set up your weekly check-ins. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-micropm-soft-gray">
      <h3 className="text-xl font-bold mb-4">Set Up Weekly Check-ins</h3>
      <p className="text-micropm-medium-gray mb-6">
        Receive guided product development prompts directly to your inbox each week.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="webhookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zapier Webhook URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://hooks.zapier.com/..." {...field} />
                </FormControl>
                <FormDescription>
                  Create a Zapier webhook to receive data from MicroPM.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="micropm-btn w-full" disabled={isLoading}>
            {isLoading ? "Setting up..." : "Set Up Weekly Check-ins"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ZapierForm;

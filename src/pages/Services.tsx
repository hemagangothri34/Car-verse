
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Define service types
interface ServicePlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

// Service plans data
const servicePlans: ServicePlan[] = [
  {
    id: "basic",
    name: "Basic Service",
    price: 3000,
    description: "Essential maintenance service for your vehicle",
    features: [
      "Oil and filter change",
      "Fluid level check and top-up",
      "Tire pressure check",
      "Basic safety inspection",
      "Exterior wash"
    ]
  },
  {
    id: "standard",
    name: "Standard Service",
    price: 5000,
    description: "Comprehensive service package for regular maintenance",
    features: [
      "All Basic Service features",
      "Air filter replacement",
      "Cabin filter replacement",
      "Brake inspection",
      "Battery health check",
      "Interior cleaning"
    ],
    recommended: true
  },
  {
    id: "premium",
    name: "Premium Service",
    price: 8000,
    description: "Complete care package for your luxury vehicle",
    features: [
      "All Standard Service features",
      "Spark plug inspection/replacement",
      "Fuel system cleaning",
      "AC system check",
      "Advanced computer diagnostics",
      "Exterior polish",
      "Complete interior detailing"
    ]
  }
];

const Services = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    
    // Scroll to booking section
    setTimeout(() => {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const handleScheduleService = () => {
    if (!selectedPlan) {
      toast({
        title: "Select a Service Plan",
        description: "Please select a service plan to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (!date) {
      toast({
        title: "Select a Date",
        description: "Please select a date for your service appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!time) {
      toast({
        title: "Select a Time Slot",
        description: "Please select a time slot for your service appointment.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedService = servicePlans.find(plan => plan.id === selectedPlan);
    
    toast({
      title: "Service Scheduled!",
      description: `Your ${selectedService?.name} is scheduled for ${format(date, 'PPP')} at ${time}.`,
    });
    
    // Navigate to calendar page
    navigate("/calendar");
  };
  
  const timeSlots = [
    "09:00 AM", 
    "10:00 AM", 
    "11:00 AM", 
    "12:00 PM", 
    "02:00 PM", 
    "03:00 PM", 
    "04:00 PM"
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Car Services</h1>
        <p className="text-muted-foreground">
          Schedule maintenance services for your vehicle
        </p>
      </div>
      
      {/* Service Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicePlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={cn(
              "relative overflow-hidden",
              selectedPlan === plan.id && "border-primary",
              plan.recommended && "border-primary"
            )}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-bl-lg">
                  Recommended
                </div>
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-2 text-2xl font-bold">
                ₹{plan.price.toLocaleString('en-IN')}
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                variant={selectedPlan === plan.id ? "default" : "outline"}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Booking Section */}
      <div id="booking-section" className="bg-card border border-border p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Schedule Your Service</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Selected Plan</label>
              <div className="mt-1 p-3 bg-secondary/50 rounded-md">
                {selectedPlan ? (
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {servicePlans.find(plan => plan.id === selectedPlan)?.name}
                    </span>
                    <span>
                      ₹{servicePlans.find(plan => plan.id === selectedPlan)?.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">No plan selected</span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => 
                      date < new Date() || 
                      date > new Date(new Date().setDate(new Date().getDate() + 30))
                    }
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={time === slot ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTime(slot)}
                    className="w-full"
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Details</label>
              <Card className="bg-secondary/30">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Car</span>
                      <span>Add your car</span>
                    </div>
                    <Button variant="outline" className="w-full text-sm" size="sm">
                      + Add Vehicle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Notes</label>
              <textarea 
                className="w-full h-[100px] bg-background border border-input rounded-md p-2 text-sm"
                placeholder="Any specific issues or requests?"
              />
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleScheduleService}
              disabled={!selectedPlan || !date || !time}
            >
              Schedule Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

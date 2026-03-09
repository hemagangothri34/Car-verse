
import { useEffect, useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Clock, Car, Settings, X } from "lucide-react";
import { format } from "date-fns";

// Define appointment types
interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "rental" | "service";
  details: {
    [key: string]: any;
  };
}

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Generate some mock appointments
  useEffect(() => {
    // Create dates for the current month
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(today.getDate() + 14);
    
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        title: "BMW X1 Rental",
        date: nextWeek,
        time: "10:00 AM",
        type: "rental",
        details: {
          car: "BMW X1",
          startDate: nextWeek,
          endDate: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
          price: "₹8,000/day",
          location: "Terminal 3, IGI Airport",
          confirmation: "XYZ12345"
        }
      },
      {
        id: "2",
        title: "Standard Service",
        date: twoWeeksLater,
        time: "11:00 AM",
        type: "service",
        details: {
          servicePlan: "Standard Service",
          vehicle: "Your Vehicle",
          price: "₹5,000",
          serviceCenter: "CarVerse Service Center, Gurgaon",
          duration: "Approx. 3 hours",
          confirmation: "SVC78901"
        }
      }
    ];
    
    setAppointments(mockAppointments);
  }, []);
  
  // Filter appointments for the selected date
  const getAppointmentsForDate = (selectedDate: Date) => {
    return appointments.filter(appointment => 
      appointment.date.getDate() === selectedDate.getDate() &&
      appointment.date.getMonth() === selectedDate.getMonth() &&
      appointment.date.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  const selectedDateAppointments = getAppointmentsForDate(date);
  
  // Handle appointment click
  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };
  
  // Function to highlight dates with appointments
  const isDayWithAppointment = (day: Date) => {
    return appointments.some(appointment => 
      appointment.date.getDate() === day.getDate() &&
      appointment.date.getMonth() === day.getMonth() &&
      appointment.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Render appointment icon based on type
  const renderAppointmentIcon = (type: "rental" | "service") => {
    return type === "rental" ? 
      <Car className="h-5 w-5 text-primary" /> : 
      <Settings className="h-5 w-5 text-primary" />;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calendar</h1>
        <p className="text-muted-foreground">
          Manage your car rentals and service appointments
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select a date to view your appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border p-3 pointer-events-auto"
              modifiers={{
                appointment: (day) => isDayWithAppointment(day),
              }}
              modifiersStyles={{
                appointment: { 
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                },
              }}
            />
          </CardContent>
        </Card>
        
        {/* Appointments for Selected Date */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Appointments for {format(date, 'PPPP')}</span>
              </div>
            </CardTitle>
            <CardDescription>
              {selectedDateAppointments.length === 0 
                ? "No appointments scheduled for this date" 
                : `${selectedDateAppointments.length} appointment(s) scheduled`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDateAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No appointments found</p>
                  <Button variant="outline" className="mt-4">
                    + Schedule New Appointment
                  </Button>
                </div>
              ) : (
                selectedDateAppointments.map((appointment) => (
                  <Card 
                    key={appointment.id} 
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {renderAppointmentIcon(appointment.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{appointment.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="h-8 hover:bg-muted"
                        >
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {appointments.length > 0 
                ? `${appointments.length} upcoming appointment(s) in total` 
                : "No upcoming appointments"}
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {renderAppointmentIcon(selectedAppointment.type)}
                <span>{selectedAppointment.title}</span>
              </DialogTitle>
              <DialogDescription>
                {format(selectedAppointment.date, 'PPP')} at {selectedAppointment.time}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {selectedAppointment.type === "rental" ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Pickup Date</p>
                      <p className="font-medium">
                        {format(selectedAppointment.details.startDate, 'PPP')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Return Date</p>
                      <p className="font-medium">
                        {format(selectedAppointment.details.endDate, 'PPP')}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">{selectedAppointment.details.price}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Location</p>
                    <p className="font-medium">{selectedAppointment.details.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Reference</p>
                    <p className="font-medium">{selectedAppointment.details.confirmation}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Service Plan</p>
                    <p className="font-medium">{selectedAppointment.details.servicePlan}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{selectedAppointment.details.vehicle}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">{selectedAppointment.details.price}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Service Center</p>
                    <p className="font-medium">{selectedAppointment.details.serviceCenter}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{selectedAppointment.details.duration}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Reference</p>
                    <p className="font-medium">{selectedAppointment.details.confirmation}</p>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <X className="h-4 w-4 mr-1" />
                Cancel Booking
              </Button>
              <Button>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarPage;

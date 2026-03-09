
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import CarCard, { CarCardProps } from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";

const RentCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();
  
  // Mock data for rental cars
  const mockRentalCars = [
    {
      id: "r1",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop",
      model: "Creta",
      brand: "Hyundai",
      type: "SUV",
      seats: 5,
      transmission: "Manual" as const,
      price: 3000, // ₹3,000/day
      priceType: "day" as const,
      fuelType: "Petrol" as const,
      year: 2022,
      mileage: 25000
    },
    {
      id: "r2",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600&auto=format&fit=crop",
      model: "X1",
      brand: "BMW",
      type: "SUV",
      seats: 5,
      transmission: "Automatic" as const,
      price: 8000, // ₹8,000/day
      priceType: "day" as const,
      fuelType: "Diesel" as const,
      year: 2023,
      mileage: 15000
    },
    {
      id: "r3",
      image: "https://images.hgmsites.net/med/2025-jeep-compass-latitude-4x4-angular-front-exterior-view_100944590_m.webp",
      model: "Compass",
      brand: "Jeep",
      type: "SUV",
      seats: 5,
      transmission: "Automatic" as const,
      price: 5000, // ₹5,000/day
      priceType: "day" as const,
      fuelType: "Diesel" as const,
      year: 2022,
      mileage: 30000
    },
    {
      id: "r4",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop",
      model: "A4",
      brand: "Audi",
      type: "Sedan",
      seats: 5,
      transmission: "Automatic" as const,
      price: 7000, // ₹7,000/day
      priceType: "day" as const,
      fuelType: "Petrol" as const,
      year: 2021,
      mileage: 40000
    },
    {
      id: "r5",
      image: "https://cdn.euroncap.com/media/70303/tesla-model-y.png?mode=crop&width=359&height=235",
      model: "Model Y",
      brand: "Tesla",
      type: "SUV",
      seats: 5,
      transmission: "Automatic" as const,
      price: 9000, // ₹9,000/day
      priceType: "day" as const,
      fuelType: "Electric" as const,
      year: 2023,
      mileage: 10000
    },
    {
      id: "r6",
      image: "https://imgd.aeplcdn.com/1056x594/n/4qubpdb_1746087.jpg?q=80",
      model: "C-Class",
      brand: "Mercedes",
      type: "Sedan",
      seats: 5,
      transmission: "Automatic" as const,
      price: 8500, // ₹8,500/day
      priceType: "day" as const,
      fuelType: "Petrol" as const,
      year: 2022,
      mileage: 25000
    },
    {
      id: "r7",
      image: "https://images.unsplash.com/photo-1570356528233-b442cf2de345?q=80&w=600&auto=format&fit=crop",
      model: "i3",
      brand: "BMW",
      type: "Hatchback",
      seats: 4,
      transmission: "Automatic" as const,
      price: 6500, // ₹6,500/day
      priceType: "day" as const,
      fuelType: "Electric" as const,
      year: 2022,
      mileage: 15000
    },
    {
      id: "r8",
      image: "https://apruhonice.s3.eu-central-1.amazonaws.com/b7/b7714c38-741b-48f1-a3d1-36db5e0d4062.box.jpg",
      model: "XC40",
      brand: "Volvo",
      type: "SUV",
      seats: 5,
      transmission: "Automatic" as const,
      price: 7500, // ₹7,500/day
      priceType: "day" as const,
      fuelType: "Hybrid" as const,
      year: 2023,
      mileage: 18000
    }
  ];
  
  useEffect(() => {
    // Simulate loading data
    const loadData = () => {
      setTimeout(() => {
        setCars(mockRentalCars);
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
    
    // Check for car ID in URL
    const searchParams = new URLSearchParams(window.location.search);
    const carId = searchParams.get("id");
    if (carId) {
      const car = mockRentalCars.find(c => c.id === carId);
      if (car) {
        // If car is found, scroll to booking section
        setTimeout(() => {
          const bookingSection = document.getElementById('booking-section');
          if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
  }, []);
  
  const handleBookNow = (id: string) => {
    const car = cars.find(c => c.id === id);
    if (car) {
      if (!startDate || !endDate) {
        toast({
          title: "Date Selection Required",
          description: "Please select both pickup and return dates.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Booking Confirmed!",
        description: `Your ${car.brand} ${car.model} is booked from ${format(startDate, 'PPP')} to ${format(endDate, 'PPP')}.`,
      });
      
      // Navigate to calendar page
      navigate("/calendar");
    }
  };
  
  const handleFilterChange = (filters: any) => {
    // In a real app, this would filter the data
    console.log("Filters applied:", filters);
    
    // For this demo, we'll just simulate filtering
    setIsLoading(true);
    setTimeout(() => {
      let filteredCars = [...mockRentalCars];
      
      // Filter by price range
      if (filters.priceRange) {
        filteredCars = filteredCars.filter(
          car => car.price >= filters.priceRange[0]/30 && car.price <= filters.priceRange[1]/30
        );
      }
      
      // Filter by fuel type
      if (filters.fuelType && filters.fuelType !== "all") {
        filteredCars = filteredCars.filter(
          car => car.fuelType?.toLowerCase() === filters.fuelType
        );
      }
      
      // Filter by transmission
      if (filters.transmission && filters.transmission !== "all") {
        filteredCars = filteredCars.filter(
          car => car.transmission.toLowerCase() === filters.transmission
        );
      }
      
      // Filter by car type
      if (filters.carType && filters.carType !== "all") {
        filteredCars = filteredCars.filter(
          car => car.type.toLowerCase() === filters.carType
        );
      }
      
      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredCars = filteredCars.filter(
          car => 
            car.model.toLowerCase().includes(query) ||
            car.brand.toLowerCase().includes(query) ||
            car.type.toLowerCase().includes(query)
        );
      }
      
      setCars(filteredCars);
      setIsLoading(false);
    }, 500);
  };
  
  // Calculate total booking days and amount
  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const totalDays = calculateTotalDays();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Rent a Car</h1>
        <p className="text-muted-foreground">
          Find the perfect car for your next trip
        </p>
      </div>
      
      {/* Date Selection */}
      <div className="p-6 bg-card rounded-lg border border-border" id="booking-section">
        <h2 className="text-xl font-bold mb-4">Book Your Ride</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  disabled={(date) => 
                    date < new Date() || (endDate ? date > endDate : false)
                  }
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Return Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => 
                    date < new Date() || (startDate ? date < startDate : false)
                  }
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium">Booking Summary</label>
            <div className="bg-secondary/50 p-4 rounded-md h-[42px] flex items-center">
              {startDate && endDate ? (
                <div className="flex justify-between w-full">
                  <span>Total: {totalDays} day{totalDays !== 1 ? 's' : ''}</span>
                  <span className="font-medium">Select a car to continue</span>
                </div>
              ) : (
                <span className="text-muted-foreground">Select dates to view summary</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />
      
      {/* Cars Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[3/2] bg-secondary/50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard 
              key={car.id} 
              {...car} 
              action="rent"
              onAction={handleBookNow}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No rental cars match your filters</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default RentCars;

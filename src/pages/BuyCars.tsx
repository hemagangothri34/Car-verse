
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import CarCard, { CarCardProps } from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";

const BuyCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarCardProps | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const { toast } = useToast();
  
  // Mock data for cars available for purchase
  const mockCars = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&auto=format&fit=crop",
      model: "718 Cayman S",
      brand: "Porsche",
      type: "Coupe",
      seats: 2,
      transmission: "Manual" as const,
      price: 8500000, // ₹85L
      fuelType: "Petrol" as const,
      year: 2022,
      mileage: 15000,
      negotiable: true
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=600&auto=format&fit=crop",
      model: "Q8",
      brand: "Audi",
      type: "SUV",
      seats: 5,
      transmission: "Automatic" as const,
      price: 9900000, // ₹99L
      fuelType: "Diesel" as const,
      year: 2023,
      mileage: 8000
    },
    {
      id: "3",
      image: "https://www.shop4tesla.com/cdn/shop/articles/tesla-model-3-uber-230000-km-und-tausende-euro-gespart-956682.jpg?v=1728598029",
      model: "Model 3",
      brand: "Tesla",
      type: "Sedan",
      seats: 5,
      transmission: "Automatic" as const,
      price: 6000000, // ₹60L
      fuelType: "Electric" as const,
      year: 2023,
      mileage: 5000
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?q=80&w=600&auto=format&fit=crop",
      model: "GLC 43",
      brand: "Mercedes",
      type: "SUV",
      seats: 5,
      transmission: "Automatic" as const,
      price: 7500000, // ₹75L
      fuelType: "Hybrid" as const,
      year: 2022,
      mileage: 12000
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop",
      model: "Huracan",
      brand: "Lamborghini",
      type: "Coupe",
      seats: 2,
      transmission: "Automatic" as const,
      price: 35000000, // ₹3.5 Cr
      fuelType: "Petrol" as const,
      year: 2022,
      mileage: 3000,
      negotiable: true
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=600&auto=format&fit=crop",
      model: "F8 Tributo",
      brand: "Ferrari",
      type: "Coupe",
      seats: 2,
      transmission: "Automatic" as const,
      price: 42000000, // ₹4.2 Cr
      fuelType: "Petrol" as const,
      year: 2021,
      mileage: 5000
    },
    {
      id: "7",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop",
      model: "XC60",
      brand: "Volvo",
      type: "SUV",
      seats: 5,
      transmission: "Automatic" as const,
      price: 6500000, // ₹65L
      fuelType: "Diesel" as const,
      year: 2022,
      mileage: 10000
    },
    {
      id: "8",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop",
      model: "i4",
      brand: "BMW",
      type: "Sedan",
      seats: 5,
      transmission: "Automatic" as const,
      price: 7200000, // ₹72L
      fuelType: "Electric" as const,
      year: 2023,
      mileage: 2000
    },
    {
      id: "9",
      image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/122451/range-rover-sport-exterior-right-front-three-quarter-20.jpeg?isig=0&q=80&q=80",
      model: "Range Rover Sport",
      brand: "Land Rover",
      type: "SUV",
      seats: 5,
      transmission: "Automatic" as const,
      price: 12000000, // ₹1.2 Cr
      fuelType: "Petrol" as const,
      year: 2022,
      mileage: 12000,
      negotiable: true
    }
  ];
  
  useEffect(() => {
    // Simulate loading data
    const loadData = () => {
      setTimeout(() => {
        setCars(mockCars);
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
    
    // Check for car ID in URL
    const searchParams = new URLSearchParams(window.location.search);
    const carId = searchParams.get("id");
    if (carId) {
      const car = mockCars.find(c => c.id === carId);
      if (car) {
        setSelectedCar(car);
        setContactDialogOpen(true);
      }
    }
  }, []);
  
  const handleContactSeller = (id: string) => {
    const car = cars.find(c => c.id === id);
    if (car) {
      setSelectedCar(car);
      setContactDialogOpen(true);
    }
  };
  
  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message for the seller.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: `Your message about the ${selectedCar?.brand} ${selectedCar?.model} has been sent to the seller.`,
    });
    setContactDialogOpen(false);
    setContactMessage("");
    
    // Redirect to messages page
    navigate("/messages");
  };
  
  const handleFilterChange = (filters: any) => {
    // In a real app, this would filter the data
    console.log("Filters applied:", filters);
    
    // For this demo, we'll just simulate filtering
    setIsLoading(true);
    setTimeout(() => {
      // Apply mock filtering logic
      let filteredCars = [...mockCars];
      
      // Filter by price range
      if (filters.priceRange) {
        filteredCars = filteredCars.filter(
          car => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
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
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Buy Cars</h1>
        <p className="text-muted-foreground">
          Find your dream car and connect with sellers directly
        </p>
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
              action="buy"
              onAction={handleContactSeller}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No cars match your filters</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
        </div>
      )}
      
      {/* Contact Seller Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Seller</DialogTitle>
            <DialogDescription>
              Interested in the {selectedCar?.brand} {selectedCar?.model}? Send a message to the seller.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">Your Message</label>
              <Textarea
                placeholder="Hi, I'm interested in your car. Is it still available?"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="mt-1"
                rows={5}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Your Contact Number</label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setContactDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSendMessage}>
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyCars;

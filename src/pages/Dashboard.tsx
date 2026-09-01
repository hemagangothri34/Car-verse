
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, ShoppingBag, Settings, Calendar, Flame } from "lucide-react";
import CarCard, { CarCardProps } from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentCars, setRecentCars] = useState<CarCardProps[]>([]);
  const [trendingCars, setTrendingCars] = useState<CarCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for recently viewed cars
  const mockRecentCars = [
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
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/37138/model-3-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
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
    }
  ];
  
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
      fuelType: "Petrol" as const
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
      fuelType: "Diesel" as const
    }
  ];

  // Mock data for trending cars
  const mockTrendingCars = [
    {
      id: "t1",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop",
      model: "M4 Competition",
      brand: "BMW",
      type: "Coupe",
      seats: 4,
      transmission: "Automatic" as const,
      price: 14000000, // ₹1.4 Cr
      fuelType: "Petrol" as const,
      year: 2023,
      mileage: 4000,
      isTrending: true,
      trendingRank: 1,
      viewsCount: "1.5k views today",
      negotiable: true
    },
    {
      id: "t2",
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=600&auto=format&fit=crop",
      model: "Defender 110",
      brand: "Land Rover",
      type: "SUV",
      seats: 7,
      transmission: "Automatic" as const,
      price: 12000000, // ₹1.2 Cr
      fuelType: "Diesel" as const,
      year: 2022,
      mileage: 10000,
      isTrending: true,
      trendingRank: 2,
      viewsCount: "980 views today"
    },
    {
      id: "t3",
      image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=600&auto=format&fit=crop",
      model: "Mustang GT",
      brand: "Ford",
      type: "Coupe",
      seats: 4,
      transmission: "Manual" as const,
      price: 8000000, // ₹80L
      fuelType: "Petrol" as const,
      year: 2021,
      mileage: 12000,
      isTrending: true,
      trendingRank: 3,
      viewsCount: "850 views today",
      negotiable: true
    }
  ];
  
  useEffect(() => {
    // Simulate loading data
    const loadData = () => {
      setTimeout(() => {
        setRecentCars(mockRecentCars);
        setTrendingCars(mockTrendingCars);
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);
  
  const handleCarClick = (id: string) => {
    navigate(`/buy?id=${id}`);
  };
  
  const handleRentalClick = (id: string) => {
    navigate(`/rent?id=${id}`);
  };
  
  // Get the username from localStorage
  const username = JSON.parse(localStorage.getItem("carverse-user") || '{"name":"User"}').name;
  
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {username}</h1>
          <p className="text-muted-foreground">Discover your dream car today!</p>
        </div>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => navigate("/buy")}
          className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ShoppingBag className="h-6 w-6" />
          <span>Buy Cars</span>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => navigate("/rent")}
          className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Car className="h-6 w-6" />
          <span>Rent Cars</span>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => navigate("/sell")}
          className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Car className="h-6 w-6" />
          <span>Sell Your Car</span>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => navigate("/services")}
          className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Settings className="h-6 w-6" />
          <span>Services</span>
        </Button>
      </div>
      
      {/* Filter Bar */}
      <FilterBar showFuelType showPriceRange showSearch />
      
      {/* Trending Cars */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-rose-500 animate-pulse" />
            <h2 className="text-2xl font-bold">Trending Right Now</h2>
          </div>
          <Button variant="link" onClick={() => navigate("/buy")}>
            View All
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/2] bg-secondary/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingCars.map((car) => (
              <CarCard 
                key={car.id} 
                {...car} 
                action="buy"
                onAction={handleCarClick}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Recently Viewed Cars */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recently Viewed Cars</h2>
          <Button variant="link" onClick={() => navigate("/buy")}>
            View All
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/2] bg-secondary/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCars.map((car) => (
              <CarCard 
                key={car.id} 
                {...car} 
                action="buy"
                onAction={handleCarClick}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Featured Rental Cars */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Hot Rental Deals</h2>
          <Button variant="link" onClick={() => navigate("/rent")}>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRentalCars.map((car) => (
            <CarCard 
              key={car.id} 
              {...car} 
              action="rent"
              onAction={handleRentalClick}
            />
          ))}
          
          <Button 
            variant="outline" 
            className="h-full min-h-[300px] border-dashed flex flex-col gap-4 hover:border-primary hover:bg-primary/5"
            onClick={() => navigate("/rent")}
          >
            <Calendar className="h-12 w-12 text-primary" />
            <span className="text-xl">Book a Rental Car</span>
            <span className="text-muted-foreground">
              Find the perfect car for your next trip
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

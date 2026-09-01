
import { Car, Fuel, Users, Clock, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";

export interface CarCardProps {
  id: string;
  image: string;
  model: string;
  brand: string;
  type: string;
  seats: number;
  transmission: "Manual" | "Automatic";
  price: number;
  priceType?: "day" | "fixed";
  fuelType?: "Electric" | "Hybrid" | "Petrol" | "Diesel";
  mileage?: number;
  year?: number;
  negotiable?: boolean;
  action?: "buy" | "rent" | "service" | "view";
  onAction?: (id: string) => void;
  isTrending?: boolean;
  trendingRank?: number;
  viewsCount?: string;
}

const CarCard = ({
  id,
  image,
  model,
  brand,
  type,
  seats,
  transmission,
  price,
  priceType = "fixed",
  fuelType = "Petrol",
  mileage,
  year,
  negotiable = false,
  action = "view",
  onAction,
  isTrending = false,
  trendingRank,
  viewsCount
}: CarCardProps) => {
  
  // Helper function to format price correctly
  const formatPrice = () => {
    // Indian format uses lakhs (1,00,000) and crores (1,00,00,000)
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };
  
  // Generate action button text based on action type
  const getActionButton = () => {
    switch(action) {
      case "buy":
        return "Contact Seller";
      case "rent":
        return "Book Now";
      case "service":
        return "Schedule Service";
      default:
        return "View Details";
    }
  };
  
  // Get fuel icon based on type
  const getFuelIcon = () => {
    switch(fuelType) {
      case "Electric":
        return "🔌";
      case "Hybrid":
        return "⚡";
      default:
        return "⛽";
    }
  };
  
  return (
    <Card className="overflow-hidden car-card-gradient border border-border/50 hover:border-primary/50 transition-all duration-300">
      <CardHeader className="p-0 relative overflow-hidden aspect-[16/9]">
        <img
          src={image || "/placeholder.svg"}
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 items-end z-10">
          {isTrending && (
            <Badge className="bg-rose-600 text-white font-bold animate-pulse hover:bg-rose-700 border-none shadow-md text-[10px] sm:text-xs">
              🔥 Trending {trendingRank && `#${trendingRank}`}
            </Badge>
          )}
          {negotiable && (
            <Badge className="tag tag-negotiable text-[10px] sm:text-xs">
              Negotiable
            </Badge>
          )}
        </div>
        
        {viewsCount && (
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-[10px] text-white py-0.5 px-1.5 rounded-sm">
            👁️ {viewsCount}
          </div>
        )}
        
        {fuelType && (
          <Badge className={`absolute top-2 left-2 tag ${fuelType === "Electric" ? "tag-electric" : fuelType === "Hybrid" ? "tag-hybrid" : "bg-muted/80 text-foreground border-none"}`}>
            {getFuelIcon()} {fuelType}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">
              {brand} {model}
            </h3>
            <p className="text-muted-foreground text-sm">{type}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">{formatPrice()}</div>
            {priceType === "day" && (
              <span className="text-xs text-muted-foreground">/day</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="feature-icon">
            <Users size={14} />
            <span>{seats} Seats</span>
          </div>
          <div className="feature-icon">
            <Car size={14} />
            <span>{transmission}</span>
          </div>
          
          {year && (
            <div className="feature-icon">
              <Clock size={14} />
              <span>{year}</span>
            </div>
          )}
          
          {mileage && (
            <div className="feature-icon">
              <Gauge size={14} />
              <span>{mileage.toLocaleString()} km</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onAction && onAction(id)}
        >
          {getActionButton()}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;

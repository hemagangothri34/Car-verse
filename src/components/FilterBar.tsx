
import { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
  showPriceRange?: boolean;
  showFuelType?: boolean;
  showSearch?: boolean;
}

const FilterBar = ({ 
  onFilterChange,
  showPriceRange = true,
  showFuelType = true,
  showSearch = true
}: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]); // 0 to 1 crore in rupees
  const [fuelType, setFuelType] = useState<string>("all");
  const [transmission, setTransmission] = useState<string>("all");
  const [carType, setCarType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Apply filters whenever any filter value changes
  useEffect(() => {
    applyFilters();
  }, [priceRange, fuelType, transmission, carType]);
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const handleFuelTypeChange = (value: string) => {
    setFuelType(value);
  };
  
  const handleTransmissionChange = (value: string) => {
    setTransmission(value);
  };
  
  const handleCarTypeChange = (value: string) => {
    setCarType(value);
  };
  
  const handleSearch = () => {
    applyFilters();
    toast({
      title: "Filters Applied",
      description: "Search results have been updated",
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 10000000]);
    setFuelType("all");
    setTransmission("all");
    setCarType("all");
    setSearchQuery("");
    
    // Apply the reset filters immediately
    setTimeout(() => applyFilters(), 0);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values",
    });
  };
  
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        fuelType,
        transmission,
        carType,
        searchQuery
      });
    }
  };
  
  // Format price label (in lakhs and crores)
  const formatPriceLabel = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };
  
  return (
    <div className="filter-container p-4 z-20">
      <div className="flex items-center justify-between gap-4 mb-4">
        {showSearch && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cars, brands or models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-9"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative"
          >
            {isExpanded ? <X /> : <SlidersHorizontal />}
            {(fuelType !== "all" || transmission !== "all" || carType !== "all" || 
             priceRange[0] > 0 || priceRange[1] < 10000000) && 
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
            }
          </Button>
          
          <Button 
            variant="secondary"
            size="sm"
            onClick={resetFilters}
            className="hidden sm:flex"
          >
            Reset
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {showPriceRange && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Price Range: {formatPriceLabel(priceRange[0])} - {formatPriceLabel(priceRange[1])}
              </label>
              <Slider
                defaultValue={priceRange}
                min={0}
                max={10000000}
                step={100000}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mt-6"
              />
            </div>
          )}
          
          {showFuelType && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Fuel Type</label>
              <ToggleGroup 
                type="single" 
                value={fuelType}
                onValueChange={(value) => value && handleFuelTypeChange(value)}
                className="justify-start"
              >
                <ToggleGroupItem value="all" aria-label="All Fuel Types">
                  All
                </ToggleGroupItem>
                <ToggleGroupItem value="electric" aria-label="Electric">
                  🔌 Electric
                </ToggleGroupItem>
                <ToggleGroupItem value="hybrid" aria-label="Hybrid">
                  ⚡ Hybrid
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Transmission</label>
            <Select 
              value={transmission}
              onValueChange={handleTransmissionChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Transmissions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transmissions</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="automatic">Automatic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Car Type</label>
            <Select 
              value={carType}
              onValueChange={handleCarTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="coupe">Coupe</SelectItem>
                <SelectItem value="convertible">Convertible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleSearch}
            className="mt-2 md:col-span-2 lg:col-span-4"
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;

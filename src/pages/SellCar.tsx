
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SellCar = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      // Simulate file upload with delay
      setTimeout(() => {
        const newImages = Array.from(e.target.files || []).map(file => 
          URL.createObjectURL(file)
        );
        
        setImages(prev => [...prev, ...newImages]);
        setUploading(false);
        
        // Show success toast
        toast({
          title: "Images Uploaded",
          description: `${newImages.length} image(s) uploaded successfully.`,
        });
      }, 1500);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (simplified for demo)
    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image of your car.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Listing Submitted!",
      description: "Your car has been listed for sale. You'll be notified when someone shows interest.",
    });
  };
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sell Your Car</h1>
        <p className="text-muted-foreground">
          List your car for sale and connect with potential buyers
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Car Details Section */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-bold mb-4">Car Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select required>
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="ferrari">Ferrari</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="hyundai">Hyundai</SelectItem>
                  <SelectItem value="jeep">Jeep</SelectItem>
                  <SelectItem value="kia">Kia</SelectItem>
                  <SelectItem value="lamborghini">Lamborghini</SelectItem>
                  <SelectItem value="landrover">Land Rover</SelectItem>
                  <SelectItem value="mahindra">Mahindra</SelectItem>
                  <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                  <SelectItem value="mercedes">Mercedes</SelectItem>
                  <SelectItem value="mg">MG</SelectItem>
                  <SelectItem value="porsche">Porsche</SelectItem>
                  <SelectItem value="skoda">Skoda</SelectItem>
                  <SelectItem value="tata">Tata</SelectItem>
                  <SelectItem value="tesla">Tesla</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="volvo">Volvo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" placeholder="e.g. Civic, X5" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select required>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => (
                    <SelectItem key={i} value={(new Date().getFullYear() - i).toString()}>
                      {new Date().getFullYear() - i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Car Type</Label>
              <Select required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="muv">MUV</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="convertible">Convertible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select required>
                <SelectTrigger id="transmission">
                  <SelectValue placeholder="Select Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fuel">Fuel Type</Label>
              <Select required>
                <SelectTrigger id="fuel">
                  <SelectValue placeholder="Select Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="cng">CNG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage (km)</Label>
              <Input id="mileage" type="number" placeholder="e.g. 25000" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" placeholder="e.g. 500000" required />
            </div>
            
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="negotiable"
                checked={isNegotiable}
                onCheckedChange={setIsNegotiable}
              />
              <Label htmlFor="negotiable">Price is negotiable</Label>
            </div>
          </div>
        </div>
        
        {/* Car Images Section */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-bold mb-4">Car Images</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((src, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-md overflow-hidden group">
                  <img src={src} alt={`Car image ${index+1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(index)}
                      className="h-8 w-8"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <label className="aspect-[4/3] border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary/70 transition-colors">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-sm text-muted-foreground">Uploading...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add Images</span>
                  </div>
                )}
              </label>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Add up to 8 images of your car. First image will be used as cover.
            </p>
          </div>
        </div>
        
        {/* Description Section */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-bold mb-4">Additional Information</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your car's condition, features, modifications, etc."
                rows={5}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="features">Features (comma separated)</Label>
              <Input
                id="features"
                placeholder="e.g. Leather seats, Sunroof, Navigation system"
              />
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" placeholder="Your name" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone Number</Label>
              <Input id="contact-phone" placeholder="e.g. +91 98765 43210" required />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contact-location">Location</Label>
              <Input id="contact-location" placeholder="City, State" required />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Save Draft
          </Button>
          <Button type="submit">
            <Upload className="mr-2 h-4 w-4" />
            List Your Car
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SellCar;

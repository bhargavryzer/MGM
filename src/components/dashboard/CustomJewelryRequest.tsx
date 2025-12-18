import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Sparkles, 
  Send,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface JewelryRequest {
  id: string;
  images: string[];
  jewelryType: string;
  metalType: string;
  budget: string;
  description: string;
  status: "pending" | "reviewed" | "in-progress" | "completed";
  createdAt: Date;
}

const CustomJewelryRequest = () => {
  const [images, setImages] = useState<string[]>([]);
  const [jewelryType, setJewelryType] = useState("");
  const [metalType, setMetalType] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [requests, setRequests] = useState<JewelryRequest[]>(() => {
    const saved = localStorage.getItem("customJewelryRequests");
    if (saved) {
      return JSON.parse(saved);
    }
    // Mock data - pre-populate with sample requests
    return [
      {
        id: "1",
        images: ["/images/products/necklace1.jpg"],
        jewelryType: "necklace",
        metalType: "22k-gold",
        budget: "1-2lakh",
        description: "Traditional gold necklace with modern design elements for wedding occasion",
        status: "in-progress",
        createdAt: new Date("2024-12-10"),
      },
      {
        id: "2",
        images: ["/images/products/ring1.jpg"],
        jewelryType: "ring",
        metalType: "diamond",
        budget: "2-5lakh",
        description: "Engagement ring with solitaire diamond and rose gold band",
        status: "reviewed",
        createdAt: new Date("2024-12-08"),
      },
      {
        id: "3",
        images: ["/images/products/earrings1.jpg"],
        jewelryType: "earrings",
        metalType: "24k-gold",
        budget: "50k-1lakh",
        description: "Temple jewelry style earrings with intricate filigree work",
        status: "completed",
        createdAt: new Date("2024-12-05"),
      }
    ];
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (images.length >= 5) {
        toast({
          title: "Maximum images reached",
          description: "You can upload up to 5 reference images",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast({
        title: "Please upload at least one image",
        description: "Reference images help us understand your vision",
        variant: "destructive",
      });
      return;
    }

    const newRequest: JewelryRequest = {
      id: Date.now().toString(),
      images,
      jewelryType,
      metalType,
      budget,
      description,
      status: "pending",
      createdAt: new Date(),
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    localStorage.setItem("customJewelryRequests", JSON.stringify(updatedRequests));

    // Reset form
    setImages([]);
    setJewelryType("");
    setMetalType("");
    setBudget("");
    setDescription("");

    toast({
      title: "Request Submitted!",
      description: "Our artisans will review your design and contact you soon.",
    });
  };

  const getStatusIcon = (status: JewelryRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "reviewed":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "in-progress":
        return <Sparkles className="w-4 h-4 text-primary" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusText = (status: JewelryRequest["status"]) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "reviewed":
        return "Under Review";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-foreground mb-2">Custom Jewelry Request</h1>
        <p className="text-muted-foreground">
          Upload your design or reference image and our master artisans will bring your vision to life.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Request Form */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Create New Request
            </CardTitle>
            <CardDescription>
              Share your jewelry design idea with us
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label>Reference Images (up to 5)</Label>
                <div
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {images.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <img
                          src={img}
                          alt={`Reference ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Jewelry Type */}
              <div className="space-y-2">
                <Label htmlFor="jewelryType">Jewelry Type</Label>
                <Select value={jewelryType} onValueChange={setJewelryType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="necklace">Necklace</SelectItem>
                    <SelectItem value="earrings">Earrings</SelectItem>
                    <SelectItem value="ring">Ring</SelectItem>
                    <SelectItem value="bangle">Bangle</SelectItem>
                    <SelectItem value="bracelet">Bracelet</SelectItem>
                    <SelectItem value="pendant">Pendant</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Metal Type */}
              <div className="space-y-2">
                <Label htmlFor="metalType">Preferred Metal</Label>
                <Select value={metalType} onValueChange={setMetalType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select metal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24k-gold">24K Gold</SelectItem>
                    <SelectItem value="22k-gold">22K Gold</SelectItem>
                    <SelectItem value="diamond">Diamond</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                    <SelectItem value="50k-1lakh">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="1-2lakh">₹1,00,000 - ₹2,00,000</SelectItem>
                    <SelectItem value="2-5lakh">₹2,00,000 - ₹5,00,000</SelectItem>
                    <SelectItem value="above-5lakh">Above ₹5,00,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Design Details</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your vision, specific details, occasion, or any special requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Previous Requests */}
        <div className="space-y-4">
          <h2 className="font-display text-xl text-foreground">Your Requests</h2>
          
          {requests.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="p-8 text-center">
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No custom requests yet. Submit your first design!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Preview Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={request.images[0]}
                            alt="Request preview"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(request.status)}
                            <span className="text-sm font-medium capitalize">
                              {getStatusText(request.status)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground font-medium capitalize">
                            {request.jewelryType} • {request.metalType?.replace("-", " ")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {request.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomJewelryRequest;

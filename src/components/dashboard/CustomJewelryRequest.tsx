import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  X,
  Sparkles,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Calendar,
  Tag,
  Gem,
  DollarSign,
  Eye,
  Trash2,
  Download,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JewelryRequest {
  id: string;
  images: string[];
  jewelryType: string;
  metalType: string;
  budget: string;
  description: string;
  status: "pending" | "reviewed" | "in-progress" | "completed";
  createdAt: Date;
  estimatedCompletion?: string;
  artisanNotes?: string;
}

const CustomJewelryRequest = () => {
  const [images, setImages] = useState<string[]>([]);
  const [jewelryType, setJewelryType] = useState("");
  const [metalType, setMetalType] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<JewelryRequest | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [requests, setRequests] = useState<JewelryRequest[]>([
    {
      id: "1",
      images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"],
      jewelryType: "necklace",
      metalType: "22k-gold",
      budget: "1-2lakh",
      description: "Traditional gold necklace with modern design elements for wedding occasion. Looking for intricate work with floral patterns.",
      status: "in-progress",
      createdAt: new Date("2024-12-10"),
      estimatedCompletion: "Dec 28, 2024",
      artisanNotes: "Beautiful design! We've started the initial sketches and will share them soon."
    },
    {
      id: "2",
      images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400"],
      jewelryType: "ring",
      metalType: "diamond",
      budget: "2-5lakh",
      description: "Engagement ring with solitaire diamond and rose gold band. Prefer cushion cut diamond.",
      status: "reviewed",
      createdAt: new Date("2024-12-08"),
      artisanNotes: "We've reviewed your request and are preparing a detailed quote with options."
    },
    {
      id: "3",
      images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"],
      jewelryType: "earrings",
      metalType: "24k-gold",
      budget: "50k-1lakh",
      description: "Temple jewelry style earrings with intricate filigree work",
      status: "completed",
      createdAt: new Date("2024-12-05"),
      artisanNotes: "Your custom earrings are ready for pickup! We're thrilled with how they turned out."
    },
    {
      id: "4",
      images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400"],
      jewelryType: "bangle",
      metalType: "22k-gold",
      budget: "1-2lakh",
      description: "Set of 4 bangles with antique finish and peacock motifs",
      status: "pending",
      createdAt: new Date("2024-12-15"),
    }
  ]);
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

    if (!jewelryType || !metalType || !budget) {
      toast({
        title: "Please fill all required fields",
        description: "All fields are necessary to process your request",
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

    setRequests([newRequest, ...requests]);

    // Reset form
    setImages([]);
    setJewelryType("");
    setMetalType("");
    setBudget("");
    setDescription("");

    toast({
      title: "Request Submitted Successfully!",
      description: "Our master artisans will review your design within 24-48 hours.",
    });
  };

  const deleteRequest = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
    setSelectedRequest(null);
    toast({
      title: "Request deleted",
      description: "Your jewelry request has been removed.",
    });
  };

  const getStatusConfig = (status: JewelryRequest["status"]) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          text: "Pending Review",
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
          dotColor: "bg-yellow-500"
        };
      case "reviewed":
        return {
          icon: AlertCircle,
          text: "Under Review",
          color: "text-blue-600 bg-blue-50 border-blue-200",
          dotColor: "bg-blue-500"
        };
      case "in-progress":
        return {
          icon: Sparkles,
          text: "Crafting in Progress",
          color: "text-purple-600 bg-purple-50 border-purple-200",
          dotColor: "bg-purple-500"
        };
      case "completed":
        return {
          icon: CheckCircle,
          text: "Ready for Pickup",
          color: "text-green-600 bg-green-50 border-green-200",
          dotColor: "bg-green-500"
        };
    }
  };

  const filteredRequests = activeTab === "all"
    ? requests
    : requests.filter(req => req.status === activeTab);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-mgm p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8" />
            <span className="text-sm font-medium tracking-wide uppercase text-primary-foreground/90">Custom Creations</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Turn Your Vision Into Reality
          </h1>
          <p className="text-primary-foreground/90 max-w-2xl">
            Share your dream jewelry design with our master artisans. Upload reference images,
            describe your vision, and we'll craft a masterpiece uniquely yours.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Sidebar - Request Form */}
        <div className="lg:col-span-2">
          <Card className="sticky top-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
            <CardHeader className="bg-gradient-mgm/10 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <Gem className="w-6 h-6 text-primary-foreground" />
                New Request
              </CardTitle>
              <CardDescription>
                Share every detail that makes your design special
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Reference Images *</Label>
                  <p className="text-xs text-muted-foreground">Upload up to 5 images</p>
                  <div
                    className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center cursor-pointer hover:border-border hover:bg-muted/50 transition-all"
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
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm font-medium text-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB each
                    </p>
                  </div>

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {images.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative aspect-square rounded-lg overflow-hidden group shadow-md"
                        >
                          <img
                            src={img}
                            alt={`Reference ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <X className="w-6 h-6 text-white" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Two Column Layout for Selects */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Jewelry Type */}
                  <div className="space-y-2">
                    <Label htmlFor="jewelryType" className="font-semibold">Type *</Label>
                    <Select value={jewelryType} onValueChange={setJewelryType}>
                      <SelectTrigger className="border-border/50">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="necklace">Necklace</SelectItem>
                        <SelectItem value="earrings">Earrings</SelectItem>
                        <SelectItem value="ring">Ring</SelectItem>
                        <SelectItem value="bangle">Bangle</SelectItem>
                        <SelectItem value="bracelet">Bracelet</SelectItem>
                        <SelectItem value="pendant">Pendant</SelectItem>
                        <SelectItem value="anklet">Anklet</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Metal Type */}
                  <div className="space-y-2">
                    <Label htmlFor="metalType" className="font-semibold">Metal *</Label>
                    <Select value={metalType} onValueChange={setMetalType}>
                      <SelectTrigger className="border-border/50">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24k-gold">24K Gold</SelectItem>
                        <SelectItem value="22k-gold">22K Gold</SelectItem>
                        <SelectItem value="18k-gold">18K Gold</SelectItem>
                        <SelectItem value="diamond">Diamond</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="rose-gold">Rose Gold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label htmlFor="budget" className="font-semibold">Budget Range *</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="border-amber-200">
                      <SelectValue placeholder="Select your budget" />
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
                  <Label htmlFor="description" className="font-semibold">Design Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your vision... What occasion is this for? Any specific patterns, stones, or cultural elements you'd like? Any inspiration behind the design?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="border-border/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-mgm hover:opacity-90 shadow-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Request
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Our artisans typically respond within 24-48 hours
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Requests List */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your Requests</h2>
            <p className="text-muted-foreground">Track the progress of your custom jewelry creations</p>
          </div>

          {/* Filter Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted">
              <TabsTrigger value="all" className="data-[state=active]:bg-background">
                All <Badge className="ml-1 bg-primary">{requests.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-background">
                Pending <Badge className="ml-1 bg-primary">{requests.filter(r => r.status === 'pending').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="reviewed" className="data-[state=active]:bg-background">
                Reviewed <Badge className="ml-1 bg-primary">{requests.filter(r => r.status === 'reviewed').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="data-[state=active]:bg-background">
                Crafting <Badge className="ml-1 bg-primary">{requests.filter(r => r.status === 'in-progress').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-background">
                Completed <Badge className="ml-1 bg-primary">{requests.filter(r => r.status === 'completed').length}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Requests Grid */}
          {filteredRequests.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No requests found</h3>
                <p className="text-muted-foreground">
                  {activeTab === "all"
                    ? "Submit your first custom jewelry request to get started!"
                    : `No ${activeTab} requests at the moment.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request, index) => {
                const statusConfig = getStatusConfig(request.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Image Gallery */}
                          <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 relative">
                            <img
                              src={request.images[0]}
                              alt="Request preview"
                              className="w-full h-full object-cover"
                            />
                            {request.images.length > 1 && (
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                +{request.images.length - 1} more
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-5 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={`${statusConfig.color} border px-3 py-1`}>
                                    <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor} mr-2 animate-pulse`}></span>
                                    {statusConfig.text}
                                  </Badge>
                                </div>
                                <h3 className="text-lg font-bold text-foreground capitalize flex items-center gap-2">
                                  <Tag className="w-4 h-4 text-primary" />
                                  {request.jewelryType}
                                </h3>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedRequest(request)}
                                className="text-primary hover:text-primary/90 hover:bg-muted"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </div>

                            {/* Metadata */}
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Gem className="w-4 h-4 text-primary" />
                                <span className="capitalize">{request.metalType.replace("-", " ")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span>{request.budget.replace("-", " - ₹")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <span>{new Date(request.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            </div>

                            {/* Description Preview */}
                            <p className="text-sm text-foreground line-clamp-2">
                              {request.description}
                            </p>

                            {/* Artisan Notes */}
                            {request.artisanNotes && (
                              <div className="bg-muted/50 border border-border/50 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-foreground mb-1">Artisan Note:</p>
                                    <p className="text-xs text-muted-foreground">{request.artisanNotes}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Estimated Completion */}
                            {request.estimatedCompletion && (
                              <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 px-3 py-2 rounded-lg w-fit">
                                <Clock className="w-4 h-4" />
                                Expected: {request.estimatedCompletion}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-11/12 max-h-[85vh] overflow-hidden shadow-2xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-mgm text-primary-foreground p-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="font-display text-2xl font-bold capitalize">{selectedRequest.jewelryType} Request</h2>
                  <p className="text-primary-foreground/90 text-sm">Request ID: {selectedRequest.id}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedRequest(null)}
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="p-4 space-y-3">
                {/* Status Banner */}
                <div className={`${getStatusConfig(selectedRequest.status).color} border-2 rounded-lg p-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const StatusIcon = getStatusConfig(selectedRequest.status).icon;
                      return <StatusIcon className="w-5 h-5" />;
                    })()}
                    <div>
                      <p className="font-bold text-base">{getStatusConfig(selectedRequest.status).text}</p>
                      <p className="text-xs opacity-80">Current Status</p>
                    </div>
                  </div>
                  {selectedRequest.estimatedCompletion && (
                    <div className="text-right">
                      <p className="font-semibold text-sm">{selectedRequest.estimatedCompletion}</p>
                      <p className="text-xs opacity-80">Est. Completion</p>
                    </div>
                  )}
                </div>

                {/* Image Gallery */}
                <div>
                  <h3 className="font-bold text-base mb-2">Reference Images</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedRequest.images.map((img, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="aspect-square rounded-lg overflow-hidden shadow-md group relative"
                      >
                        <img 
                          src={img} 
                          alt={`Reference ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Jewelry Type</span>
                    </div>
                    <p className="text-base capitalize">{selectedRequest.jewelryType}</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Gem className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Metal Type</span>
                    </div>
                    <p className="text-base capitalize">{selectedRequest.metalType.replace("-", " ")}</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-sm">Budget Range</span>
                    </div>
                    <p className="text-base">{selectedRequest.budget.replace("-", " - ₹")}</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-sm">Submitted On</span>
                    </div>
                    <p className="text-base">{new Date(selectedRequest.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                  <h3 className="font-bold text-base mb-1">Design Details</h3>
                  <p className="text-sm text-foreground line-clamp-3">{selectedRequest.description}</p>
                </div>

                {/* Artisan Notes */}
                {selectedRequest.artisanNotes && (
                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                    <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-600" />
                      Artisan Notes
                    </h3>
                    <p className="text-sm text-amber-800 line-clamp-2">{selectedRequest.artisanNotes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 h-9 text-sm"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Send Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 h-9 text-sm"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download Quote
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedRequest(null);
                      deleteRequest(selectedRequest.id);
                    }}
                    className="flex-1 transition-all duration-300 hover:scale-105 h-9 text-sm"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete Request
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomJewelryRequest;
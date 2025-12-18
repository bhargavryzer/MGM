import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Calendar, Truck, Shield, RefreshCcw, ChevronLeft, ChevronRight, Gem, Scale, Award, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import BookAppointmentModal from "@/components/BookAppointmentModal";
import { products, formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import AnimatedPage from "@/components/AnimatedPage";
import { slideUpVariants, scaleInVariants } from "@/lib/animations";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== id
  ).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
          <Link to="/catalogue">
            <Button>Browse Collection</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || [product.image];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Product link has been copied to clipboard.",
    });
  };

  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />

      <main className="pb-20">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-cream via-cream to-gold/10 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/catalogue" className="hover:text-primary transition-colors">
                Collections
              </Link>
              <span>/</span>
              <Link
                to={`/catalogue?category=${product.category}`}
                className="hover:text-primary transition-colors capitalize"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Images */}
              <motion.div
                variants={scaleInVariants}
                initial="initial"
                animate="animate"
                className="lg:col-span-7 space-y-4"
              >
                {/* Main Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-cream-dark shadow-lg">
                  <img
                    src={images[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-gold text-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md">
                        New Arrival
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-primary text-primary-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Best Seller
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="bg-destructive text-destructive-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button
                      onClick={handleAddToWishlist}
                      className="p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110 group"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="w-5 h-5 group-hover:text-primary transition-colors" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
                      aria-label="Share product"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 justify-center">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedImageIndex === index
                            ? "border-gold ring-2 ring-gold/30"
                            : "border-border/50 hover:border-gold/50"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Right Column - Details */}
              <motion.div
                variants={scaleInVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.1 }}
                className="lg:col-span-5 space-y-6"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-gold/20 text-gold-dark rounded-full text-xs font-semibold uppercase tracking-wider">
                      {product.karatage}
                    </span>
                    {product.certification && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                        {product.certification}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl lg:text-4xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
                      <Scale className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-xs text-muted-foreground">Gold Weight</p>
                    <p className="font-semibold text-sm">{product.goldWeight || product.weight}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
                      <Award className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-xs text-muted-foreground">Purity</p>
                    <p className="font-semibold text-sm">{product.purity}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
                      <Gem className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-xs text-muted-foreground">Making</p>
                    <p className="font-semibold text-sm">{product.makingCharges || "12%"}</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    size="xl"
                    className="w-full text-lg py-6"
                  >
                    <Calendar className="w-5 h-5" />
                    Book an Appointment
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleAddToWishlist}
                    className="w-full"
                  >
                    <Heart className="w-5 h-5" />
                    Add to Wishlist
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, text: "BIS Hallmarked" },
                    { icon: Truck, text: "Free Shipping" },
                    { icon: RefreshCcw, text: "15-Day Returns" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1 p-3 bg-cream rounded-xl text-center"
                    >
                      <item.icon className="w-5 h-5 text-gold" />
                      <span className="text-xs font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Detailed Information Tabs */}
            <motion.div
              variants={slideUpVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="mt-16"
            >
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 h-14 mb-8 bg-cream rounded-xl p-1">
                  <TabsTrigger value="details" className="rounded-lg font-medium data-[state=active]:bg-background data-[state=active]:shadow-md">
                    Gold Details
                  </TabsTrigger>
                  <TabsTrigger value="stones" className="rounded-lg font-medium data-[state=active]:bg-background data-[state=active]:shadow-md">
                    Stone Details
                  </TabsTrigger>
                  <TabsTrigger value="care" className="rounded-lg font-medium data-[state=active]:bg-background data-[state=active]:shadow-md">
                    Care Guide
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-0">
                  <div className="max-w-4xl mx-auto bg-gradient-to-br from-cream to-cream-dark rounded-2xl p-8">
                    <h3 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
                      <Scale className="w-6 h-6 text-gold" />
                      Gold Specifications
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { label: "Karatage", value: product.karatage },
                        { label: "Gold Weight", value: product.goldWeight || product.weight },
                        { label: "Gross Weight", value: product.weight },
                        { label: "Purity", value: product.purity },
                        { label: "Making Charges", value: product.makingCharges || "12%" },
                        { label: "Metal", value: product.metal },
                      ].map((spec, index) => (
                        <div key={index} className="bg-background rounded-xl p-4 shadow-sm">
                          <p className="text-sm text-muted-foreground mb-1">{spec.label}</p>
                          <p className="font-semibold text-lg">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stones" className="mt-0">
                  <div className="max-w-4xl mx-auto bg-gradient-to-br from-cream to-cream-dark rounded-2xl p-8">
                    <h3 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
                      <Gem className="w-6 h-6 text-gold" />
                      Stone Specifications
                    </h3>
                    {product.stones && product.stones.length > 0 ? (
                      <div className="space-y-6">
                        {product.stones.map((stone, index) => (
                          <div key={index} className="bg-background rounded-xl p-6 shadow-sm">
                            <h4 className="font-semibold text-lg text-primary mb-4 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              {stone.type}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                              {stone.carat && (
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Carat</p>
                                  <p className="font-semibold">{stone.carat} ct</p>
                                </div>
                              )}
                              {stone.count && (
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Quantity</p>
                                  <p className="font-semibold">{stone.count} pcs</p>
                                </div>
                              )}
                              {stone.cut && (
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Cut</p>
                                  <p className="font-semibold">{stone.cut}</p>
                                </div>
                              )}
                              {stone.clarity && (
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Clarity</p>
                                  <p className="font-semibold">{stone.clarity}</p>
                                </div>
                              )}
                              {stone.color && (
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Color</p>
                                  <p className="font-semibold">{stone.color}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Gem className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>This piece features pure gold without gemstones</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="care" className="mt-0">
                  <div className="max-w-4xl mx-auto bg-gradient-to-br from-cream to-cream-dark rounded-2xl p-8">
                    <h3 className="font-display text-2xl font-semibold mb-6">Jewelry Care Guide</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Storage",
                          desc: "Store each piece separately in a soft cloth pouch to prevent scratches. Keep away from direct sunlight and humidity.",
                        },
                        {
                          title: "Cleaning",
                          desc: "Gently clean with a soft, lint-free cloth. For deeper cleaning, use warm water with mild soap and dry thoroughly.",
                        },
                        {
                          title: "Wearing",
                          desc: "Remove jewelry before swimming, bathing, or exercising. Apply perfumes and cosmetics before wearing jewelry.",
                        },
                        {
                          title: "Maintenance",
                          desc: "Visit our store annually for professional cleaning and inspection. We offer complimentary polishing services.",
                        },
                      ].map((care, index) => (
                        <div key={index} className="bg-background rounded-xl p-5 shadow-sm">
                          <h4 className="font-semibold text-lg mb-2">{care.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{care.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-cream">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  You May Also Like
                </h2>
                <Link to={`/catalogue?category=${product.category}`} className="text-primary hover:underline font-medium">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <BookAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        productName={product.name}
      />
    </AnimatedPage>
  );
};

export default ProductDetails;

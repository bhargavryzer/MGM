import React, { useState } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, AlertTriangle, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { ids: wishlistIds, remove } = useWishlist();
  const { toast } = useToast();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Initialize with some mock wishlist items if empty
  React.useEffect(() => {
    // Always show mock data for demonstration
    const mockWishlistIds = [1, 2, 3, 4, 5, 6, 7, 8]; // More comprehensive sample product IDs
    mockWishlistIds.forEach(id => {
      // This would normally update the wishlist state
      console.log(`Mock wishlist item: ${id}`);
    });
  }, [wishlistIds]);

  // Enhanced mock data for demonstration with jewelry-specific web images
  const mockWishlistItems = [
    {
      id: 1,
      name: "Traditional Gold Necklace",
      category: "necklaces",
      price: "₹45,999",
      image: "https://images.unsplash.com/photo-1596944933706-3c8a3a5b9a8a?w=400&h=500&fit=crop&auto=format"
    },
    {
      id: 2,
      name: "Diamond Stud Earrings",
      category: "earrings", 
      price: "₹28,499",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7c33e3?w=400&h=500&fit=crop&auto=format"
    },
    {
      id: 3,
      name: "Silver Charm Bracelet",
      category: "bracelets",
      price: "₹12,999",
      image: "https://images.unsplash.com/photo-1604672381552-e0339e3a7dcd?w=400&h=500&fit=crop&auto=format"
    },
    {
      id: 4,
      name: "Ruby Solitaire Ring",
      category: "rings",
      price: "₹35,749",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop&auto=format"
    },
    {
      id: 5,
      name: "Pearl Drop Pendant",
      category: "pendants",
      price: "₹18,299",
      image: "https://images.unsplash.com/photo-1599643789224-9a024161d37a6?w=400&h=500&fit=crop&auto=format"
    },
    {
      id: 6,
      name: "22K Gold Bangles",
      category: "bangles",
      price: "₹52,999",
      image: "https://images.unsplash.com/photo-1601314050351-0bdf1d8b4b5e?w=400&h=500&fit=crop&auto=format"
    },
    {
      id: 7,
      name: "Emerald Drop Earrings",
      category: "earrings",
      price: "₹22,499",
      image: "https://images.unsplash.com/photo-1573403325484-234b23f7d3f1?w=400&h=500&fit=crop&auto=format"
    },
    {
      id: 8,
      name: "Platinum Link Chain",
      category: "chains",
      price: "₹38,999",
      image: "https://images.unsplash.com/photo-1611595771532-2a0212d25d2c?w=400&h=500&fit=crop&auto=format"
    }
  ];

  const wishlistItems = mockWishlistItems; // Always show mock data for demonstration

  const removeFromWishlist = (productId: string | number) => {
    setItemToRemove(Number(productId));
    setShowRemoveDialog(true);
  };

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      remove(itemToRemove);
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
      setShowRemoveDialog(false);
      setItemToRemove(null);
    }
  };

  const viewProductDetails = (product: any) => {
    setSelectedProduct(product);
    setShowDetailsDialog(true);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-mgm rounded-xl p-4 text-primary-foreground shadow-lg">
        <h1 className="font-display text-2xl font-bold mb-1">My Wishlist</h1>
        <p className="text-primary-foreground/90 text-sm">
          {wishlistItems.length} items saved for later
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Start adding items you love to your wishlist
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/catalogue">
                <Button className="gap-2 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105">
                  <ShoppingBag className="w-4 h-4" />
                  Browse Collection
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                onClick={() => {
                  toast({
                    title: "Wishlist Tips",
                    description: "Look for the heart icon on product pages to add items to your wishlist",
                  });
                }}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                How to Add Items
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-destructive hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <CardContent className="p-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-body text-sm font-semibold text-primary">{product.price}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs px-2 py-1 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                      onClick={() => viewProductDetails(product)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Remove Confirmation Dialog */}
      {showRemoveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-xl shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Remove from Wishlist</h3>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to remove this item from your wishlist?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowRemoveDialog(false)}
                  className="border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmRemove}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300"
                >
                  Remove Item
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Product Details Dialog */}
      {showDetailsDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-xl shadow-xl max-w-lg w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize mb-2">{selectedProduct.category}</p>
                  <p className="font-semibold text-primary text-lg">{selectedProduct.price}</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsDialog(false)}
                  className="border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  Close
                </Button>
                <Link to={`/product/${selectedProduct.id}`}>
                  <Button
                    onClick={() => setShowDetailsDialog(false)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                  >
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;

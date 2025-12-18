import { useState, useEffect } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { products, Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { ids: wishlistIds, remove } = useWishlist();
  const { toast } = useToast();

  const wishlistItems = products.filter((p) => wishlistIds.includes(Number(p.id)));

  const removeFromWishlist = (productId: string | number) => {
    const numId = Number(productId);
    remove(numId);
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-foreground mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistItems.length} items saved for later
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-muted-foreground mb-6">
              Start adding items you love to your wishlist
            </p>
            <Link to="/catalogue">
              <Button className="gap-2">
                <ShoppingBag className="w-4 h-4" />
                Browse Collection
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 overflow-hidden group">
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
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-destructive hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <CardContent className="p-3">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-body text-sm font-semibold text-primary">{product.price}</span>
                    <Link to={`/product/${product.id}`}>
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

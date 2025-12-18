import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import { useWishlist } from "@/hooks/use-wishlist";
import { Link } from "react-router-dom";

interface QuickViewModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const wishlist = useWishlist();
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background rounded-2xl shadow-2xl p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quickview-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-1/3">
                <img src={product.image} alt={product.name} className="w-full h-28 object-cover rounded-lg" />
              </div>
              <div className="flex-1">
                <h3 id="quickview-title" className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{formatPrice(product.price)}</p>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{product.description}</p>

                <div className="mt-4 flex items-center gap-3">
                  <Button onClick={() => { wishlist.toggle(Number(product.id)); }}>
                    <Heart className={`w-4 h-4 mr-2 ${wishlist.isIn(Number(product.id)) ? 'text-red-500' : ''}`} />
                    {wishlist.isIn(Number(product.id)) ? 'Saved' : 'Wishlist'}
                  </Button>

                  <Link to={`/product/${product.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
              </div>

              <button onClick={onClose} className="p-2 rounded-full hover:bg-muted ml-2" aria-label="Close quick view">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;

import { Link } from "react-router-dom";
import { Search, User, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { drawerVariants, hoverScale } from "@/lib/animations";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/catalogue" },
    { name: "Rings", href: "/catalogue?category=rings" },
    { name: "Earrings", href: "/catalogue?category=earrings" },
    { name: "Necklaces", href: "/catalogue?category=necklaces" },
    { name: "Bangles", href: "/catalogue?category=bangles" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-mgm text-primary-foreground backdrop-blur-md border-b border-border">
      {/* Top Bar removed per design request */}

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <motion.div {...hoverScale}>
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/images/footer-logo.png" 
                alt="MGM MEGA GOLD MART Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300 font-body tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/dashboard" className="p-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors hidden sm:block" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/dashboard" className="p-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors" aria-label="Dashboard">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            variants={drawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block py-3 text-foreground/80 hover:text-primary transition-colors font-body border-b border-border/50 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/dashboard"
                className="block py-3 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

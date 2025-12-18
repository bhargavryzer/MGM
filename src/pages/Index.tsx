import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Truck, Award, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import AnimatedPage from "@/components/AnimatedPage";
import { 
  heroTextVariants, 
  staggerContainer, 
  staggerItem, 
  hoverScale
} from "@/lib/animations";

// Mock hero banner - using a gradient background instead of image
const heroBanner = null;

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero-banner.png"
              alt="Elegant woman wearing traditional Indian gold jewelry with maang tikka, earrings and necklace"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
          </div>

          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              variants={heroTextVariants}
              initial="initial"
              animate="animate"
              className="max-w-xl text-primary-foreground"
            >
              <span className="inline-block text-gold font-medium tracking-widest uppercase mb-4">
                New Collection 2024
              </span>
              <h1 className="font-elegant text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Timeless Elegance, <br />
                <span className="text-gold-light">Crafted in Gold</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                Discover our exquisite collection of handcrafted jewelry, 
                where tradition meets contemporary design.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalogue">
                  <motion.div {...hoverScale}>
                    <Button 
                      variant="hero-outline" 
                      size="lg"
                      className="relative bg-gradient-to-br from-yellow-200/20 via-yellow-400/30 to-yellow-600/20 backdrop-blur-md border border-yellow-300/50 hover:border-yellow-400/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                    >
                      <span className="relative z-10">Explore Collection</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 via-yellow-200/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 via-yellow-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-yellow-600/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-yellow-300/20 opacity-60"></div>
                      <div className="absolute inset-0 bg-gradient-to-bl from-yellow-300/20 via-transparent to-yellow-500/20"></div>
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </section>

        {/* Features Bar */}
        <section className="bg-cream border-y border-border">
          <div className="container mx-auto px-4 py-8">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { icon: Shield, title: "BIS Hallmark", desc: "Certified Purity" },
                { icon: Truck, title: "Free Shipping", desc: "Above ₹50,000" },
                { icon: Award, title: "Premium Quality", desc: "Since 1985" },
                { icon: RefreshCcw, title: "Easy Returns", desc: "15-Day Policy" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={staggerItem}
                  className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start"
                >
                  <feature.icon className="w-8 h-8 text-gold flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Browse By
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Shop By Category
              </h2>
            </motion.div>

            <div className="w-full overflow-hidden py-16">
              <motion.div 
                className="flex gap-8"
                animate={{ x: 0 }}
                whileHover={{
                  x: [-2000, 0],
                  transition: {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 20,
                      ease: "linear",
                    },
                  }
                }}
              >
                {/* Triple categories for seamless full-width loop */}
                {[...categories, ...categories, ...categories].map((category, index) => (
                  <motion.div
                    key={`${category.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % categories.length) * 0.1 }}
                    className="flex flex-col items-center flex-shrink-0 w-40 md:w-52 lg:w-60"
                  >
                    <Link
                      to={`/catalogue?category=${category.id}`}
                      className="group block relative overflow-hidden rounded-full w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-full" />
                    </Link>
                    <div className="text-center mt-4">
                      <h3 className="font-elegant text-lg md:text-xl font-semibold text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {category.count} Products
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            >
              <div>
                <span className="text-gold font-medium tracking-widest uppercase text-sm">
                  Handpicked For You
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Featured Collection
                </h2>
              </div>
              <Link
                to="/catalogue"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-4 md:mt-0"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="py-20 bg-gradient-mgm">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center text-primary-foreground max-w-3xl mx-auto"
            >
              <span className="inline-block text-gold font-medium tracking-widest uppercase mb-4">
                Special Offer
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Wedding Season Sale
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Get up to 25% off on our exclusive bridal collection. 
                Make your special day even more memorable with our handcrafted jewelry.
              </p>
              <Link to="/catalogue">
                <Button 
                  variant="gold" 
                  size="xl"
                  className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-foreground shadow-xl hover:shadow-2xl border border-yellow-200/60 hover:border-yellow-300/80 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Bridal Collection
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 via-yellow-200/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 via-yellow-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-yellow-600/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-yellow-300/20 opacity-60"></div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            >
              <div>
                <span className="text-gold font-medium tracking-widest uppercase text-sm">
                  Customer Favorites
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Best Sellers
                </h2>
              </div>
              <Link
                to="/catalogue"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-4 md:mt-0"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-cream-dark">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-elegant text-3xl md:text-4xl font-bold text-foreground mb-4">
                Join Our Inner Circle
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to receive exclusive offers, early access to new collections, 
                and insider news from MGM Jewels.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold text-foreground"
                />
                <Button variant="outline" size="lg" type="submit" className="px-6 py-5">
                  Subscribe
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </AnimatedPage>
  );
};

export default Index;

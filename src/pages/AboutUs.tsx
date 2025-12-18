import { motion } from "framer-motion";
import { Shield, Truck, Award, RefreshCcw, Heart, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedPage from "@/components/AnimatedPage";
import { 
  heroTextVariants, 
  staggerContainer, 
  staggerItem, 
  hoverScale
} from "@/lib/animations";

const AboutUs = () => {
  const milestones = [
    { year: "1985", title: "Founded", description: "MGM Jewels began its journey with a small workshop in Zaveri Bazaar" },
    { year: "1995", title: "First Expansion", description: "Opened our second store and expanded our craftsmanship team" },
    { year: "2005", title: "Digital Presence", description: "Launched our first website to reach customers nationwide" },
    { year: "2015", title: "International Recognition", description: "Received awards for excellence in traditional jewelry design" },
    { year: "2024", title: "Modern Era", description: "Continuing the legacy with contemporary designs and sustainable practices" }
  ];

  const values = [
    { icon: Shield, title: "Authenticity", description: "BIS Hallmark certified jewelry with guaranteed purity" },
    { icon: Heart, title: "Craftsmanship", description: "Handcrafted by skilled artisans with decades of experience" },
    { icon: Award, title: "Quality", description: "Rigorous quality control at every step of creation" },
    { icon: Users, title: "Customer Trust", description: "Building lasting relationships through exceptional service" }
  ];

  const stats = [
    { number: "39+", label: "Years of Excellence" },
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Unique Designs" },
    { number: "25+", label: "Master Artisans" }
  ];

  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/90 via-foreground/70 to-foreground/50" />
          <div className="absolute inset-0 bg-gradient-mgm opacity-80" />
          
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              variants={heroTextVariants}
              initial="initial"
              animate="animate"
              className="max-w-3xl text-primary-foreground"
            >
              <span className="inline-block text-gold font-medium tracking-widest uppercase mb-4">
                Our Heritage
              </span>
              <h1 className="font-elegant text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Crafting <span className="text-gold-light">Timeless Elegance</span> Since 1985
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                For nearly four decades, MGM Jewels has been synonymous with exquisite craftsmanship, 
                authentic designs, and unwavering commitment to quality in every piece we create.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Our Journey
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                A Legacy of Excellence
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 1985 by the visionary Mr. M. G. Menon, MGM Jewels began as a small workshop 
                  in Mumbai's iconic Zaveri Bazaar with a simple mission: to create jewelry that celebrates 
                  India's rich heritage while embracing contemporary elegance.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we stand as a testament to three generations of jewelers who have preserved 
                  traditional techniques while innovating for the modern connoisseur. Each piece tells a 
                  story of passion, precision, and perfection.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our commitment extends beyond jewelry – we're dedicated to sustainable practices, 
                  ethical sourcing, and creating pieces that become cherished family heirlooms.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-mgm rounded-2xl shadow-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-primary-foreground">
                    <div className="text-center p-8">
                      <Clock className="w-16 h-16 mx-auto mb-4 text-gold" />
                      <h3 className="font-display text-2xl font-bold mb-2">39 Years</h3>
                      <p className="text-lg">Of Crafting Excellence</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-mgm">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="text-center text-primary-foreground"
                >
                  <h3 className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Our Values
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Principles That Guide Us
              </h2>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="text-center p-6 rounded-2xl bg-cream/50 hover:bg-cream transition-colors duration-300"
                >
                  <value.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-cream-dark">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Our Journey
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Milestones & Achievements
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gold to-gold/20"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-background p-6 rounded-2xl shadow-lg">
                      <span className="text-gold font-bold text-lg">{milestone.year}</span>
                      <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-background"></div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-mgm">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center text-primary-foreground max-w-3xl mx-auto"
            >
              <h2 className="font-elegant text-3xl md:text-5xl font-bold mb-6">
                Experience Our Legacy
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Discover the perfect blend of tradition and innovation in our exclusive collections. 
                Each piece is crafted with love and designed to be cherished for generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div {...hoverScale}>
                  <Button variant="gold" size="xl" className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-foreground shadow-lg hover:shadow-xl border border-yellow-200/60 hover:border-yellow-300/80 transition-all duration-300">
                    Explore Collections
                  </Button>
                </motion.div>
                <motion.div {...hoverScale}>
                  <Button variant="outline" size="xl" className="border-primary-foreground/50 hover:border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                    Visit Our Store
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </AnimatedPage>
  );
};

export default AboutUs;

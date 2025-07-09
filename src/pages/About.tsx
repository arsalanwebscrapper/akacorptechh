import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6">
              About AKACorpTech
            </h1>
            <p className="font-raleway text-lg md:text-xl mb-8 opacity-90">
              Transforming businesses through innovative technology solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6 text-primary">
                Who We Are
              </h2>
              <p className="font-raleway text-muted-foreground mb-6 text-lg leading-relaxed">
                AKACorpTech is a leading IT services company based in Noida, specializing in custom software development, 
                web applications, mobile apps, and emerging technologies like AI and blockchain.
              </p>
              <p className="font-raleway text-muted-foreground mb-6 text-lg leading-relaxed">
                Our team of expert developers and designers work tirelessly to deliver cutting-edge solutions 
                that drive digital transformation for businesses of all sizes.
              </p>
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => window.open('https://wa.me/917678245132?text=Hi, I want to know more about AKACorpTech', '_blank')}
              >
                Get In Touch
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/api/placeholder/600/400"
                alt="AKACorpTech Team"
                className="w-full rounded-xl shadow-elegant"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6 text-primary">
              Our Impact
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '100%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Support Available' },
              { number: '5+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-card p-6 rounded-xl shadow-soft"
              >
                <div className="text-3xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-montserrat font-bold text-5xl md:text-7xl mb-6 text-black leading-tight">
            Modern Software
            <br />
            <span className="text-accent">Solutions</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-raleway text-xl md:text-2xl mb-12 text-gray-700 max-w-2xl mx-auto">
            Transforming businesses with custom software, AI solutions, and digital innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent-light text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            onClick={() => window.open('https://wa.me/917678245132', '_blank')}
          >
            Start Your Project
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            onClick={() => window.open('https://wa.me/917678245132?text=Hi, I would like a free consultation', '_blank')}
          >
            Free Consultation
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 text-gray-800"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">50+</div>
            <div className="text-sm">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">100%</div>
            <div className="text-sm">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">24/7</div>
            <div className="text-sm">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

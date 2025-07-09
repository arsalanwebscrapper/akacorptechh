import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaVolumeHigh, FaVolumeXmark, FaPlay, FaPause } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoControl = (action: 'mute' | 'play') => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (!video) return;

    if (action === 'mute') {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    } else {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Simplified geometric background with no gradient influence */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-montserrat font-bold text-5xl md:text-7xl mb-6 text-white leading-tight">
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
          <p className="font-raleway text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
            Transforming businesses with custom software, AI solutions, and digital innovation
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
            className="bg-accent hover:bg-accent-light text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
            onClick={() => window.open('https://wa.me/917678245132', '_blank')}
          >
            Start Your Project
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            onClick={() => window.open('https://wa.me/917678245132?text=Hi, I would like a free consultation', '_blank')}
          >
            Free Consultation
          </Button>
        </motion.div>

        {/* Minimal Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 text-white/80"
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

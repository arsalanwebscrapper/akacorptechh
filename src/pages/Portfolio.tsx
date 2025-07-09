import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'Stock Strategix',
      description: 'Advanced stock market analysis platform with real-time data visualization and AI-powered trading insights.',
      image: '/api/placeholder/600/400',
      category: 'Website Design',
      technologies: ['React', 'Python', 'TensorFlow', 'WebSocket'],
      link: 'https://stockstrategix.com',
      featured: true
    },
    {
      id: 2,
      title: 'Crush Car',
      description: 'Comprehensive automotive marketplace with advanced search, comparison tools, and dealer management system.',
      image: '/api/placeholder/600/400',
      category: 'Website Development',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: 'https://crushcar.in',
      featured: true
    },
    {
      id: 3,
      title: 'B2B International',
      description: 'Enterprise-grade B2B trading platform with multi-currency support, logistics tracking, and automated workflows.',
      image: '/api/placeholder/600/400',
      category: 'Software Development',
      technologies: ['Vue.js', 'Laravel', 'Redis', 'Docker'],
      link: 'https://b2binternational.com',
      featured: true
    },
    {
      id: 4,
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce solution with inventory management, payment processing, and analytics.',
      image: '/api/placeholder/600/400',
      category: 'Web Application',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      link: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
      image: '/api/placeholder/600/400',
      category: 'Mobile App',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
      link: '#',
      featured: false
    },
    {
      id: 6,
      title: 'AI Chatbot Platform',
      description: 'Intelligent chatbot platform with natural language processing and machine learning capabilities.',
      image: '/api/placeholder/600/400',
      category: 'AI/ML',
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      link: '#',
      featured: false
    }
  ];

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
              Our Portfolio
            </h1>
            <p className="font-raleway text-lg md:text-xl mb-8 opacity-90">
              Discover our latest projects and success stories
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  
                  <button
                    onClick={() => window.open(project.link, '_blank')}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-accent font-semibold">{project.category}</span>
                  </div>
                  
                  <h3 className="font-montserrat font-bold text-xl mb-3 text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent-light p-0 h-auto font-semibold group/btn"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    View Project
                    <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
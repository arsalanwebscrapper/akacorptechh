import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PortfolioSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // For now using static data - will connect to Supabase when configured
      setProjects([
        {
          id: 1,
          title: 'Stock Strategix',
          description: 'Modern stock trading platform with advanced analytics and real-time data visualization.',
          image_url: '/api/placeholder/600/400',
          category: 'Website Design',
          technologies: ['UI/UX', 'React', 'Finance'],
          project_url: 'https://stockstrategix.com',
          gradient: 'from-blue-500 to-purple-600'
        },
        {
          id: 2,
          title: 'Crush Car',
          description: 'Dynamic automotive marketplace with advanced search and comparison features.',
          image_url: '/api/placeholder/600/400',
          category: 'Website Development',
          technologies: ['E-commerce', 'Node.js', 'Automotive'],
          project_url: 'https://crushcar.com',
          gradient: 'from-red-500 to-orange-600'
        },
        {
          id: 3,
          title: 'B2B International',
          description: 'Enterprise software solution for international trade and logistics management.',
          image_url: '/api/placeholder/600/400',
          category: 'Software Development',
          technologies: ['Enterprise', 'B2B', 'Logistics'],
          project_url: 'https://b2binternational.com',
          gradient: 'from-green-500 to-teal-600'
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-primary">
            Discover Our Latest{' '}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="font-raleway text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform Ideas into Scalable Solutions - Our portfolio showcases cutting-edge projects that drive digital evolution.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-soft animate-pulse">
                <div className="h-64 bg-muted"></div>
                <div className="p-6">
                  <div className="h-4 bg-muted rounded mb-3"></div>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-16 bg-muted rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-muted rounded"></div>
                    <div className="h-6 w-16 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group card-hover bg-card rounded-xl overflow-hidden shadow-soft"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url || project.image || '/api/placeholder/600/400'}
                    alt={`${project.title} - ${project.category}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-primary to-accent'} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white text-white hover:bg-white hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                      onClick={() => window.open(project.project_url || project.link || '#', '_blank')}
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      View Live
                    </Button>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-montserrat font-bold text-xl mb-3 text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-raleway text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || project.tags || []).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent-light p-0 h-auto font-semibold group/btn"
                    onClick={() => window.open(`https://wa.me/917678245132?text=Hi, I want to know more about ${project.title}`, '_blank')}
                  >
                    Learn More
                    <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            variant="cta" 
            size="lg"
            onClick={() => window.open('https://wa.me/917678245132?text=Hi, I want to see your complete portfolio', '_blank')}
          >
            View All Projects
            <FaArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
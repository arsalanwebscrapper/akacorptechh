import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FaCode, 
  FaGlobe, 
  FaMobile, 
  FaCloud, 
  FaLock, 
  FaBullhorn,
  FaRobot,
  FaArrowRight 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Custom Software',
      description: 'Build enterprise-grade systems tailored to your business needs with cutting-edge technology.',
      icon: FaCode,
      color: 'from-blue-500 to-blue-600',
      size: 'large'
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Modern, responsive websites that drive engagement and conversions.',
      icon: FaGlobe,
      color: 'from-green-500 to-green-600',
      size: 'small'
    },
    {
      id: 3,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile solutions for iOS and Android.',
      icon: FaMobile,
      color: 'from-purple-500 to-purple-600',
      size: 'small'
    },
    {
      id: 4,
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure and seamless deployment pipelines.',
      icon: FaCloud,
      color: 'from-cyan-500 to-cyan-600',
      size: 'small'
    },
    {
      id: 5,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.',
      icon: FaLock,
      color: 'from-red-500 to-red-600',
      size: 'small'
    },
    {
      id: 6,
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies that amplify your brand reach.',
      icon: FaBullhorn,
      color: 'from-orange-500 to-orange-600',
      size: 'large'
    },
    {
      id: 7,
      title: 'AI & Blockchain',
      description: 'Leverage cutting-edge tech for innovative solutions and competitive advantage.',
      icon: FaRobot,
      color: 'from-indigo-500 to-indigo-600',
      size: 'large'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-primary">
            Transform Ideas into{' '}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Scalable Solutions
            </span>
          </h2>
          <p className="font-raleway text-lg text-muted-foreground max-w-2xl mx-auto">
            Full-stack expertise across custom software, AI/ML, blockchain, and digital transformation. 
            Level up with AKACorpTech.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            const isLarge = service.size === 'large';
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`group card-hover bg-card rounded-xl p-6 shadow-soft relative overflow-hidden ${
                  isLarge ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative mb-4 ${isLarge ? 'text-center' : ''}`}>
                  <div className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-r ${service.color} ${
                    isLarge ? 'w-16 h-16' : 'w-12 h-12'
                  }`}>
                    <IconComponent className={`text-white ${isLarge ? 'text-2xl' : 'text-xl'}`} />
                  </div>
                </div>

                {/* Content */}
                <div className={`relative ${isLarge ? 'text-center' : ''}`}>
                  <h3 className={`font-montserrat font-bold mb-3 text-foreground group-hover:text-accent transition-colors ${
                    isLarge ? 'text-2xl' : 'text-xl'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`font-raleway text-muted-foreground mb-4 ${
                    isLarge ? 'text-base max-w-md mx-auto' : 'text-sm'
                  }`}>
                    {service.description}
                  </p>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent-light p-0 h-auto font-semibold group/btn"
                    onClick={() => window.open(`https://wa.me/917678245132?text=Hi, I want to know more about ${service.title}`, '_blank')}
                  >
                    Learn More
                    <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-primary rounded-2xl p-8 md:p-12"
        >
          <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-4 text-primary-foreground">
            Ready to Transform Your Business?
          </h3>
          <p className="font-raleway text-lg mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
            From concept to deployment, we build solutions that scale. 
            Coffee = Code Fuel, and we're always brewing innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent" 
              size="lg"
              onClick={() => window.open('https://wa.me/917678245132?text=Hi, I want to discuss my project requirements', '_blank')}
            >
              Start Your Project
              <FaArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => window.open('https://wa.me/917678245132?text=Hi, I want to schedule a consultation', '_blank')}
            >
              Schedule Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
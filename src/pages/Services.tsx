import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
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

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Custom Software Development',
      description: 'Build enterprise-grade systems tailored to your business needs with cutting-edge technology.',
      icon: FaCode,
      features: ['Enterprise Solutions', 'Scalable Architecture', 'Custom APIs', 'Integration Services'],
      price: 'Starting from ₹2,50,000'
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Modern, responsive websites that drive engagement and conversions.',
      icon: FaGlobe,
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'],
      price: 'Starting from ₹75,000'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile solutions for iOS and Android.',
      icon: FaMobile,
      features: ['iOS & Android', 'Cross-Platform', 'App Store Deployment', 'Maintenance'],
      price: 'Starting from ₹1,50,000'
    },
    {
      id: 4,
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure and seamless deployment pipelines.',
      icon: FaCloud,
      features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Monitoring', 'Auto-scaling'],
      price: 'Starting from ₹50,000'
    },
    {
      id: 5,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.',
      icon: FaLock,
      features: ['Security Audits', 'Penetration Testing', 'Compliance', '24/7 Monitoring'],
      price: 'Starting from ₹1,00,000'
    },
    {
      id: 6,
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies that amplify your brand reach.',
      icon: FaBullhorn,
      features: ['SEO/SEM', 'Social Media', 'Analytics', 'Content Strategy'],
      price: 'Starting from ₹25,000/month'
    },
    {
      id: 7,
      title: 'AI & Blockchain',
      description: 'Leverage cutting-edge tech for innovative solutions and competitive advantage.',
      icon: FaRobot,
      features: ['Machine Learning', 'Smart Contracts', 'Data Analytics', 'Automation'],
      price: 'Starting from ₹3,00,000'
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
              Our Services
            </h1>
            <p className="font-raleway text-lg md:text-xl mb-8 opacity-90">
              Transform your business with our comprehensive IT solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary">
                      <IconComponent className="text-white text-xl" />
                    </div>
                  </div>
                  
                  <h3 className="font-montserrat font-bold text-xl mb-3 text-foreground group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="font-raleway text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mb-4">
                    <span className="font-montserrat font-semibold text-accent">{service.price}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full group/btn"
                    onClick={() => window.open(`https://wa.me/917678245132?text=Hi, I want to know more about ${service.title}`, '_blank')}
                  >
                    Get Quote
                    <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="font-raleway text-lg mb-8 opacity-90">
              Get in touch with our experts to discuss your requirements and get a custom quote.
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

      <Footer />
    </div>
  );
};

export default Services;
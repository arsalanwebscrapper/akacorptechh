import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaLinkedin, 
  FaInstagram, 
  FaTwitter, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaWhatsapp 
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const services = [
    { href: '/services/custom-software', label: 'Custom Software' },
    { href: '/services/web-development', label: 'Web Development' },
    { href: '/services/mobile-apps', label: 'Mobile Apps' },
    { href: '/services/cloud-devops', label: 'Cloud & DevOps' },
    { href: '/services/cybersecurity', label: 'Cybersecurity' },
    { href: '/services/digital-marketing', label: 'Digital Marketing' },
  ];

  const legalLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/sitemap', label: 'Sitemap' },
    { href: '/awards', label: 'Awards' },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/akacorptech', label: 'Facebook' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/akacorptech', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com/akacorptech', label: 'Instagram' },
    { icon: FaTwitter, href: 'https://twitter.com/akacorptech', label: 'Twitter' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">
              Stay Updated with Tech Trends
            </h3>
            <p className="font-raleway text-primary-foreground/90 mb-6">
              Get insights on AI, Blockchain, DevOps, and more. Coffee = Code Fuel, and knowledge is power.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Email address"
              />
              <Button 
                variant="accent" 
                size="lg"
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">A</span>
              </div>
              <span className="font-montserrat font-bold text-2xl">AKACorpTech</span>
            </div>
            <p className="font-raleway text-primary-foreground/90 mb-6 text-sm leading-relaxed">
              Empowering businesses globally with custom software solutions. 
              From clunky to custom, we transform ideas into scalable digital evolution.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-accent flex-shrink-0" />
                <span>Noida, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-accent flex-shrink-0" />
                <a href="tel:+917678245132" className="hover:text-accent transition-colors">
                  +91 7678245132
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-accent flex-shrink-0" />
                <a href="mailto:info@akacorptech.com" className="hover:text-accent transition-colors">
                  info@akacorptech.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-raleway text-primary-foreground/90 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="font-raleway text-primary-foreground/90 hover:text-accent transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6">Connect With Us</h4>
            
            {/* WhatsApp CTA */}
            <div className="mb-6">
              <Button
                variant="accent"
                size="sm"
                className="w-full"
                onClick={() => window.open('https://wa.me/917678245132', '_blank')}
              >
                <FaWhatsapp className="mr-2" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Social Media */}
            <div className="mb-6">
              <h5 className="font-raleway font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Google Maps */}
            <div>
              <a
                href="https://maps.google.com/?q=Noida,Uttar+Pradesh,India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent-light transition-colors text-sm"
              >
                <FaMapMarkerAlt />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="font-raleway text-primary-foreground/90 text-sm">
                © {new Date().getFullYear()} AKACorpTech. All rights reserved.
              </p>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-raleway text-primary-foreground/90 hover:text-accent transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
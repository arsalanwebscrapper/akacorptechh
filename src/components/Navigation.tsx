import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { 
      href: '/services', 
      label: 'Services',
      subItems: [
        { href: '/services/custom-software', label: 'Custom Software' },
        { href: '/services/web-development', label: 'Web Development' },
        { href: '/services/mobile-apps', label: 'Mobile Apps' },
        { href: '/services/cloud-devops', label: 'Cloud & DevOps' },
        { href: '/services/cybersecurity', label: 'Cybersecurity' },
        { href: '/services/digital-marketing', label: 'Digital Marketing' },
        { href: '/services/emerging-tech', label: 'Emerging Tech' },
      ]
    },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/auth', label: 'Admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg md:text-xl">A</span>
            </div>
            <span className="font-montserrat font-bold text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">
              AKACorpTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  to={item.href}
                  className={`nav-link font-raleway font-medium transition-colors ${
                    isActive(item.href) ? 'text-accent active' : 'text-foreground hover:text-accent'
                  }`}
                >
                  {item.label}
                </Link>
                
                {/* Dropdown for Services */}
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-card shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-4 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="block p-2 text-sm text-foreground hover:text-accent hover:bg-secondary/50 rounded transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://wa.me/917678245132', '_blank')}
            >
              Talk to CTO
            </Button>
            <Button 
              variant="accent" 
              size="sm"
              onClick={() => window.open('https://wa.me/917678245132?text=Hi, I would like a free audit', '_blank')}
            >
              Free Audit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2 bg-background/95 backdrop-blur-sm rounded-lg mt-2">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  to={item.href}
                  className={`block px-4 py-2 font-raleway font-medium transition-colors ${
                    isActive(item.href) ? 'text-accent bg-secondary/50' : 'text-foreground hover:text-accent hover:bg-secondary/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                
                {/* Mobile Submenu */}
                {item.subItems && (
                  <div className="pl-4 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className="block px-4 py-1 text-sm text-muted-foreground hover:text-accent transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="px-4 pt-4 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  window.open('https://wa.me/917678245132', '_blank');
                  setIsOpen(false);
                }}
              >
                Talk to CTO
              </Button>
              <Button 
                variant="accent" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  window.open('https://wa.me/917678245132?text=Hi, I would like a free audit', '_blank');
                  setIsOpen(false);
                }}
              >
                Free Audit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
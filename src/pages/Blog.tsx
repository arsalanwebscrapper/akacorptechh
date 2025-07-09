import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaCalendar, FaUser, FaClock, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Demo blog posts - In real implementation, this would come from your backend
  const demoPosts: BlogPost[] = [
    {
      id: 1,
      title: "AI in 2025: Trends to Watch for Business Transformation",
      excerpt: "Explore the latest AI trends that will revolutionize business operations in 2025, from generative AI to autonomous systems.",
      author: "AKACorpTech Team",
      publishedAt: "2024-12-15",
      readTime: "8 min read",
      category: "Artificial Intelligence",
      tags: ["AI", "Machine Learning", "Business Strategy", "2025 Trends"],
      image: "/api/placeholder/600/400",
      featured: true
    },
    {
      id: 2,
      title: "Building Scalable React Applications: Best Practices",
      excerpt: "Learn essential techniques for building maintainable and scalable React applications that can grow with your business.",
      author: "Dev Team",
      publishedAt: "2024-12-10",
      readTime: "12 min read",
      category: "Web Development",
      tags: ["React", "JavaScript", "Frontend", "Scalability"],
      image: "/api/placeholder/600/400",
      featured: true
    },
    {
      id: 3,
      title: "Blockchain Beyond Cryptocurrency: Real-World Applications",
      excerpt: "Discover how blockchain technology is transforming industries beyond finance, from supply chain to healthcare.",
      author: "Blockchain Expert",
      publishedAt: "2024-12-05",
      readTime: "10 min read",
      category: "Blockchain",
      tags: ["Blockchain", "Cryptocurrency", "Supply Chain", "Healthcare"],
      image: "/api/placeholder/600/400",
      featured: false
    },
    {
      id: 4,
      title: "DevOps Best Practices for Startup Success",
      excerpt: "Essential DevOps strategies that can help startups deploy faster, scale efficiently, and maintain high-quality software.",
      author: "DevOps Team",
      publishedAt: "2024-12-01",
      readTime: "6 min read",
      category: "DevOps",
      tags: ["DevOps", "CI/CD", "Startups", "Cloud"],
      image: "/api/placeholder/600/400",
      featured: false
    },
    {
      id: 5,
      title: "Cybersecurity in the Age of Remote Work",
      excerpt: "Protecting your business in a distributed workforce: essential security measures for remote teams.",
      author: "Security Expert",
      publishedAt: "2024-11-28",
      readTime: "9 min read",
      category: "Cybersecurity",
      tags: ["Security", "Remote Work", "Privacy", "Data Protection"],
      image: "/api/placeholder/600/400",
      featured: false
    },
    {
      id: 6,
      title: "The Future of Mobile App Development",
      excerpt: "Exploring emerging technologies and frameworks that will shape mobile app development in the coming years.",
      author: "Mobile Team",
      publishedAt: "2024-11-25",
      readTime: "7 min read",
      category: "Mobile Development",
      tags: ["Mobile", "Flutter", "React Native", "iOS", "Android"],
      image: "/api/placeholder/600/400",
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      setLoading(true);
      // In real implementation, this would be an API call to your backend
      setTimeout(() => {
        setPosts(demoPosts);
        setLoading(false);
      }, 1000);
    };

    fetchPosts();
  }, []);

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading latest tech insights...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-primary">
              Tech Insights &{' '}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
            <p className="font-raleway text-lg text-muted-foreground mb-8">
              Stay ahead with the latest trends in AI, blockchain, DevOps, and more. 
              Coffee = Code Fuel, and knowledge is power.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-montserrat font-bold text-3xl mb-8 text-center text-primary">
                Featured Articles
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {featuredPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="card-hover h-full">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-accent text-accent-foreground">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <FaCalendar className="w-3 h-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaClock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="font-montserrat text-xl mb-2 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaUser className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{post.author}</span>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent-light group/btn">
                          Read More
                          <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-montserrat font-bold text-3xl mb-8 text-center text-primary">
              Latest Articles
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {regularPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="card-hover h-full">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <FaCalendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="font-montserrat text-lg mb-2 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FaUser className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent-light group/btn">
                        Read
                        <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              variant="cta" 
              size="lg"
              onClick={() => window.open('https://wa.me/917678245132?text=Hi, I want to contribute to your blog', '_blank')}
            >
              Want to Contribute?
              <FaArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
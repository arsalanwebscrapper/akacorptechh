
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaCalendar, FaUser, FaClock, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useBlogData, useRealtimeBlogData, BlogPost } from '@/hooks/useBlogData';

const Blog = () => {
  const { posts, isLoading, error } = useBlogData();
  useRealtimeBlogData(); // Enable real-time updates

  // Filter published posts only for public view
  const publishedPosts = posts.filter(post => post.status === 'published');
  const featuredPosts = publishedPosts.filter(post => post.featured);
  const regularPosts = publishedPosts.filter(post => !post.featured);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string | null) => {
    if (!content) return '1 min read';
    const words = content.split(' ').length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
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

  if (isLoading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-destructive mb-4">Error loading blog posts</p>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderBlogCard = (post: BlogPost, isFeatured = false) => (
    <motion.div key={post.id} variants={itemVariants}>
      <Card className="card-hover h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={post.image_url || "/api/placeholder/600/400"}
            alt={post.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className={isFeatured ? "bg-accent text-accent-foreground" : "bg-secondary"}>
              {isFeatured ? 'Featured' : post.category || 'General'}
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center space-x-1">
              <FaCalendar className="w-3 h-3" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock className="w-3 h-3" />
              <span>{calculateReadTime(post.content)}</span>
            </div>
          </div>
          
          <CardTitle className="font-montserrat text-xl mb-2 line-clamp-2">
            {post.title}
          </CardTitle>
          
          <CardDescription className="line-clamp-3">
            {post.excerpt || 'No excerpt available'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.slice(0, 3).map((tag) => (
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
  );

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
              {featuredPosts.map((post) => renderBlogCard(post, true))}
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

          {regularPosts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularPosts.map((post) => renderBlogCard(post))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No published articles yet. Check back soon!
              </p>
            </div>
          )}

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

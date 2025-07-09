
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FaBlog, 
  FaFolder, 
  FaEnvelope, 
  FaUsers, 
  FaChartLine, 
  FaEye,
  FaSignOutAlt,
  FaPlus
} from 'react-icons/fa';
import { useBlogData, useRealtimeBlogData } from '@/hooks/useBlogData';
import { useContactData, useRealtimeContactData } from '@/hooks/useContactData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { posts, isLoading: postsLoading } = useBlogData();
  const { messages, isLoading: messagesLoading } = useContactData();
  const { toast } = useToast();
  useRealtimeBlogData(); // Enable real-time updates
  useRealtimeContactData(); // Enable real-time updates for contact messages

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }
      
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of the admin panel.",
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  // Calculate real stats from blog and contact data
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;
  const draftPosts = posts.filter(post => post.status === 'draft').length;
  const featuredPosts = posts.filter(post => post.featured).length;
  const totalMessages = messages.length;
  const unreadMessages = messages.filter(msg => msg.status === 'unread').length;

  const stats = [
    {
      title: 'Total Blog Posts',
      value: totalPosts.toString(),
      icon: FaBlog,
      color: 'from-blue-500 to-blue-600',
      change: `${publishedPosts} published`
    },
    {
      title: 'Draft Posts',
      value: draftPosts.toString(),
      icon: FaFolder,
      color: 'from-green-500 to-green-600',
      change: `${featuredPosts} featured`
    },
    {
      title: 'Contact Messages',
      value: messagesLoading ? '...' : totalMessages.toString(),
      icon: FaEnvelope,
      color: 'from-orange-500 to-orange-600',
      change: unreadMessages > 0 ? `${unreadMessages} unread` : 'All read'
    },
    {
      title: 'Website Visitors',
      value: '1,234',
      icon: FaUsers,
      color: 'from-purple-500 to-purple-600',
      change: '+12% this month'
    }
  ];

  const quickActions = [
    {
      title: 'Write New Blog Post',
      description: 'Create and publish a new blog article',
      icon: FaPlus,
      action: () => navigate('/admin/blogs'),
      color: 'bg-accent hover:bg-accent-light'
    },
    {
      title: 'Manage Blogs',
      description: 'View, edit, and manage all blog posts',
      icon: FaBlog,
      action: () => navigate('/admin/blogs'),
      color: 'bg-primary hover:bg-primary-light'
    },
    {
      title: 'Manage Portfolio',
      description: 'Update portfolio projects and case studies',
      icon: FaFolder,
      action: () => navigate('/admin/portfolio'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'View Messages',
      description: 'Check and respond to contact form submissions',
      icon: FaEnvelope,
      action: () => navigate('/admin/contacts'),
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'Analytics',
      description: 'View website performance and visitor analytics',
      icon: FaChartLine,
      action: () => navigate('/admin/analytics'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Visit Website',
      description: 'View the public website',
      icon: FaEye,
      action: () => window.open('/', '_blank'),
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to auth page
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-xl text-primary">AKACorpTech</h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/', '_blank')}
              >
                <FaEye className="mr-2" />
                View Site
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="font-montserrat font-bold text-3xl text-primary mb-2">
            Welcome back! ☕
          </h2>
          <p className="text-muted-foreground font-raleway">
            Manage your content, monitor performance, and keep the digital evolution going.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        {(postsLoading || messagesLoading) && stat.title.includes('Posts') ? '...' : stat.value}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="font-montserrat font-bold text-2xl text-primary mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Card 
                  key={action.title} 
                  className="card-hover cursor-pointer"
                  onClick={action.action}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="font-montserrat text-lg">
                          {action.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="font-raleway">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-xl">Recent Blog Posts</CardTitle>
            <CardDescription>Latest blog posts from your content management system</CardDescription>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.slice(0, 4).map((post) => (
                  <div key={post.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <span className="font-raleway text-sm font-medium">{post.title}</span>
                        <p className="text-xs text-muted-foreground">
                          By {post.author} • {post.status === 'published' ? 'Published' : 'Draft'}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {post.updated_at ? new Date(post.updated_at).toLocaleDateString() : 'No date'}
                    </span>
                  </div>
                ))}
                {posts.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No blog posts yet. Create your first post to get started!
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

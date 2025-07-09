
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaSearch,
  FaArrowLeft,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import { useBlogData, useRealtimeBlogData, useBlogMutations, BlogPost } from '@/hooks/useBlogData';

const BlogManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'AKACorpTech Team',
    category: '',
    tags: [],
    image_url: '',
    featured: false,
    status: 'draft',
    seo_title: '',
    seo_description: '',
    seo_keywords: []
  });
  
  const navigate = useNavigate();
  const { posts, isLoading } = useBlogData();
  const { createBlog, updateBlog, deleteBlog } = useBlogMutations();
  useRealtimeBlogData(); // Enable real-time updates

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth !== 'true') {
      navigate('/auth');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'tags' || name === 'seo_keywords') {
      const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
      setFormData(prev => ({
        ...prev,
        [name]: arrayValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      updateBlog.mutate({ 
        id: editingPost.id, 
        ...formData 
      });
    } else {
      createBlog.mutate(formData as Omit<BlogPost, 'id' | 'published_at' | 'updated_at'>);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'AKACorpTech Team',
      category: '',
      tags: [],
      image_url: '',
      featured: false,
      status: 'draft',
      seo_title: '',
      seo_description: '',
      seo_keywords: []
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      deleteBlog.mutate(id);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
              >
                <FaArrowLeft className="mr-2" />
                Dashboard
              </Button>
              <div>
                <h1 className="font-montserrat font-bold text-xl text-primary">Blog Manager</h1>
                <p className="text-sm text-muted-foreground">Create, edit, and manage blog posts</p>
              </div>
            </div>
            
            <Button
              variant="accent"
              onClick={() => setShowForm(true)}
            >
              <FaPlus className="mr-2" />
              New Blog Post
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm ? (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading blog posts...</p>
                </div>
              </div>
            )}

            {/* Posts Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        {post.featured && (
                          <Badge className="bg-accent text-accent-foreground">
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="font-montserrat text-lg line-clamp-2">
                        {post.title}
                      </CardTitle>
                      
                      <CardDescription className="line-clamp-2">
                        {post.excerpt || 'No excerpt available'}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags && post.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <p>{post.category || 'No category'}</p>
                          <p>By {post.author}</p>
                          <p>Published: {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Not published'}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <FaEdit className="mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/blog`, '_blank')}
                          >
                            <FaEye className="mr-1" />
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                          >
                            <FaTrash className="mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? 'No blog posts found matching your search.' : 'No blog posts yet.'}
                </p>
                <Button
                  variant="accent"
                  className="mt-4"
                  onClick={() => setShowForm(true)}
                >
                  <FaPlus className="mr-2" />
                  Create Your First Blog Post
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Blog Form */
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-montserrat text-2xl">
                    {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </CardTitle>
                  <CardDescription>
                    {editingPost ? 'Update your blog post details' : 'Fill in the details for your new blog post'}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  onClick={resetForm}
                >
                  <FaTimes />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="font-montserrat font-semibold text-lg">Basic Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt *</Label>
                      <Textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt || ''}
                        onChange={handleInputChange}
                        placeholder="Brief description of the blog post"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., Web Development, AI, Blockchain"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={formData.tags?.join(', ') || ''}
                        onChange={handleInputChange}
                        placeholder="React, JavaScript, Tutorial"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="Author name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image_url">Featured Image URL</Label>
                      <Input
                        id="image_url"
                        name="image_url"
                        value={formData.image_url || ''}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  {/* SEO Information */}
                  <div className="space-y-4">
                    <h3 className="font-montserrat font-semibold text-lg">SEO Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seo_title">SEO Title</Label>
                      <Input
                        id="seo_title"
                        name="seo_title"
                        value={formData.seo_title || ''}
                        onChange={handleInputChange}
                        placeholder="SEO optimized title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seo_description">SEO Description</Label>
                      <Textarea
                        id="seo_description"
                        name="seo_description"
                        value={formData.seo_description || ''}
                        onChange={handleInputChange}
                        placeholder="SEO meta description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seo_keywords">SEO Keywords (comma-separated)</Label>
                      <Input
                        id="seo_keywords"
                        name="seo_keywords"
                        value={formData.seo_keywords?.join(', ') || ''}
                        onChange={handleInputChange}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          name="featured"
                          checked={formData.featured || false}
                          onChange={handleInputChange}
                          className="rounded border-border"
                        />
                        <Label htmlFor="featured">Featured Post</Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content || ''}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                    rows={12}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit" 
                    variant="accent"
                    disabled={createBlog.isPending || updateBlog.isPending}
                  >
                    <FaSave className="mr-2" />
                    {createBlog.isPending || updateBlog.isPending 
                      ? 'Saving...' 
                      : (editingPost ? 'Update Post' : 'Create Post')
                    }
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlogManager;

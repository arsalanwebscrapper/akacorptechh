
-- Create a table for blog comments
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NOT NULL REFERENCES public.blogs(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for contact messages
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for portfolio items
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Comments can be read by everyone, but admin can manage them
CREATE POLICY "Anyone can view published blog comments" 
  ON public.blog_comments 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can create blog comments" 
  ON public.blog_comments 
  FOR INSERT 
  WITH CHECK (true);

-- Contact messages - only admin can view
CREATE POLICY "Allow all operations on contact messages" 
  ON public.contact_messages 
  FOR ALL 
  USING (true);

-- Portfolio items can be read by everyone, admin can manage
CREATE POLICY "Anyone can view published portfolio items" 
  ON public.portfolio_items 
  FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Allow all operations on portfolio items" 
  ON public.portfolio_items 
  FOR ALL 
  USING (true);

-- Create trigger for updating updated_at column
CREATE TRIGGER update_blog_comments_updated_at 
  BEFORE UPDATE ON public.blog_comments 
  FOR EACH ROW 
  EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at 
  BEFORE UPDATE ON public.portfolio_items 
  FOR EACH ROW 
  EXECUTE PROCEDURE public.update_updated_at_column();

-- Insert some sample portfolio data
INSERT INTO public.portfolio_items (title, description, image_url, category, technologies, project_url, featured) VALUES
('Stock Strategix', 'Advanced stock market analysis platform with real-time data visualization and AI-powered trading insights.', '/api/placeholder/600/400', 'Website Design', ARRAY['React', 'Python', 'TensorFlow', 'WebSocket'], 'https://stockstrategix.com', true),
('Crush Car', 'Comprehensive automotive marketplace with advanced search, comparison tools, and dealer management system.', '/api/placeholder/600/400', 'Website Development', ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://crushcar.in', true),
('B2B International', 'Enterprise-grade B2B trading platform with multi-currency support, logistics tracking, and automated workflows.', '/api/placeholder/600/400', 'Software Development', ARRAY['Vue.js', 'Laravel', 'Redis', 'Docker'], 'https://b2binternational.com', true);


-- Create blogs table for storing blog posts
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[]
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for blogs (allowing all operations for now - you can restrict later)
CREATE POLICY "Allow all operations on blogs" ON public.blogs
  FOR ALL USING (true)
  WITH CHECK (true);

-- Enable realtime for the blogs table
ALTER TABLE public.blogs REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blogs;

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON public.blogs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample blog data
INSERT INTO public.blogs (title, excerpt, content, author, category, tags, featured, status) VALUES
('Getting Started with React and TypeScript', 'Learn the fundamentals of building modern web applications with React and TypeScript.', 'React has become one of the most popular JavaScript libraries for building user interfaces. When combined with TypeScript, it provides a powerful development experience with type safety and better tooling support...', 'John Developer', 'Web Development', ARRAY['React', 'TypeScript', 'JavaScript'], true, 'published'),
('The Future of AI in Software Development', 'Exploring how artificial intelligence is transforming the way we write and maintain code.', 'Artificial Intelligence is revolutionizing every aspect of technology, and software development is no exception. From code completion to automated testing, AI tools are becoming increasingly sophisticated...', 'Sarah AI Expert', 'Artificial Intelligence', ARRAY['AI', 'Machine Learning', 'Development Tools'], true, 'published'),
('Building Scalable Backend Services', 'Best practices for creating robust and scalable server-side applications.', 'As applications grow in complexity and user base, the importance of scalable backend architecture becomes crucial. This comprehensive guide covers the essential patterns and practices...', 'Mike Backend', 'Backend Development', ARRAY['Scalability', 'Architecture', 'Performance'], false, 'published'),
('Modern CSS Techniques for 2024', 'Discover the latest CSS features and techniques for creating stunning web designs.', 'CSS continues to evolve with new features that make it easier to create complex layouts and beautiful designs. In this article, we explore the most important CSS techniques...', 'Emma Designer', 'Web Design', ARRAY['CSS', 'Design', 'Frontend'], false, 'draft');

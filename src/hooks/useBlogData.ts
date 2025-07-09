
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  author: string;
  published_at: string | null;
  updated_at: string | null;
  category: string | null;
  tags: string[] | null;
  image_url: string | null;
  featured: boolean | null;
  status: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
}

export const useBlogData = () => {
  const { toast } = useToast();

  const { data: posts = [], isLoading, error, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      console.log('Fetching blogs from Supabase...');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }

      console.log('Fetched blogs:', data);
      return data as BlogPost[];
    },
  });

  return {
    posts,
    isLoading,
    error,
    refetch,
  };
};

export const useBlogMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createBlog = useMutation({
    mutationFn: async (blogData: Omit<BlogPost, 'id' | 'published_at' | 'updated_at'>) => {
      console.log('Creating blog post:', blogData);
      const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()
        .single();

      if (error) {
        console.error('Error creating blog:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Blog Created!",
        description: "Your new blog post has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
      console.error('Create blog error:', error);
    },
  });

  const updateBlog = useMutation({
    mutationFn: async ({ id, ...blogData }: Partial<BlogPost> & { id: string }) => {
      console.log('Updating blog post:', id, blogData);
      const { data, error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating blog:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Blog Updated!",
        description: "Your blog post has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      });
      console.error('Update blog error:', error);
    },
  });

  const deleteBlog = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting blog post:', id);
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blog:', error);
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Blog Deleted",
        description: "The blog post has been deleted successfully.",
        variant: "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      });
      console.error('Delete blog error:', error);
    },
  });

  return {
    createBlog,
    updateBlog,
    deleteBlog,
  };
};

export const useRealtimeBlogData = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('Setting up real-time blog subscription...');
    
    const channel = supabase
      .channel('blogs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blogs'
        },
        (payload) => {
          console.log('Real-time blog update:', payload);
          queryClient.invalidateQueries({ queryKey: ['blogs'] });
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time blog subscription...');
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};

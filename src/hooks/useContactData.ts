
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string | null;
  created_at: string;
}

export const useContactData = () => {
  const { toast } = useToast();

  const { data: messages = [], isLoading, error, refetch } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      console.log('Fetching contact messages from Supabase...');
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact messages:', error);
        throw error;
      }

      console.log('Fetched contact messages:', data);
      return data as ContactMessage[];
    },
  });

  return {
    messages,
    isLoading,
    error,
    refetch,
  };
};

export const useContactMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createMessage = useMutation({
    mutationFn: async (messageData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => {
      console.log('Creating contact message:', messageData);
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ ...messageData, status: 'unread' }])
        .select()
        .single();

      if (error) {
        console.error('Error creating contact message:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error('Create message error:', error);
    },
  });

  const updateMessageStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      console.log('Updating message status:', id, status);
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating message status:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: "Status Updated",
        description: "Message status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update message status. Please try again.",
        variant: "destructive",
      });
      console.error('Update message status error:', error);
    },
  });

  const deleteMessage = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting contact message:', id);
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting contact message:', error);
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: "Message Deleted",
        description: "The message has been deleted successfully.",
        variant: "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      });
      console.error('Delete message error:', error);
    },
  });

  return {
    createMessage,
    updateMessageStatus,
    deleteMessage,
  };
};

export const useRealtimeContactData = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('Setting up real-time contact messages subscription...');
    
    const channel = supabase
      .channel('contact-messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_messages'
        },
        (payload) => {
          console.log('Real-time contact message update:', payload);
          queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time contact messages subscription...');
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};

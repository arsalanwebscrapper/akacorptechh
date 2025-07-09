
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useContactData, useContactMutations, useRealtimeContactData } from '@/hooks/useContactData';
import {
  FaArrowLeft,
  FaTrash,
  FaEnvelope,
  FaEnvelopeOpen,
  FaExternalLinkAlt
} from 'react-icons/fa';

const ContactManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { messages, isLoading: messagesLoading } = useContactData();
  const { updateMessageStatus, deleteMessage } = useContactMutations();
  
  useRealtimeContactData(); // Enable real-time updates

  // Check authentication
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

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await updateMessageStatus.mutateAsync({ id: messageId, status: 'read' });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleMarkAsUnread = async (messageId: string) => {
    try {
      await updateMessageStatus.mutateAsync({ id: messageId, status: 'unread' });
    } catch (error) {
      console.error('Error marking message as unread:', error);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage.mutateAsync(messageId);
        if (selectedMessage === messageId) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleReplyViaEmail = (email: string, subject: string) => {
    const replySubject = subject.startsWith('Re: ') ? subject : `Re: ${subject}`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(replySubject)}`, '_blank');
  };

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

  const selectedMessageData = messages.find(msg => msg.id === selectedMessage);
  const unreadCount = messages.filter(msg => msg.status === 'unread').length;
  const totalCount = messages.length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="font-montserrat font-bold text-3xl text-primary">
                Contact Messages
              </h1>
              <p className="text-muted-foreground font-raleway">
                Manage contact form submissions and inquiries
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Total: {totalCount}
            </Badge>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Unread: {unreadCount}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  Messages
                </CardTitle>
                <CardDescription>
                  Click on a message to view details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No messages found.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedMessage === message.id
                            ? 'border-accent bg-accent/10'
                            : 'hover:border-accent/50'
                        } ${message.status === 'unread' ? 'border-l-4 border-l-accent' : ''}`}
                        onClick={() => setSelectedMessage(message.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm">{message.name}</span>
                            {message.status === 'unread' && (
                              <Badge variant="secondary" size="sm">New</Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-1">{message.subject}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {message.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessageData ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{selectedMessageData.subject}</span>
                        {selectedMessageData.status === 'unread' && (
                          <Badge variant="secondary">Unread</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        From: {selectedMessageData.name} ({selectedMessageData.email})
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {selectedMessageData.status === 'unread' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(selectedMessageData.id)}
                        >
                          <FaEnvelopeOpen className="mr-2" />
                          Mark as Read
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsUnread(selectedMessageData.id)}
                        >
                          <FaEnvelope className="mr-2" />
                          Mark as Unread
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReplyViaEmail(selectedMessageData.email, selectedMessageData.subject)}
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        Reply via Email
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(selectedMessageData.id)}
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Name:</span> {selectedMessageData.name}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {selectedMessageData.email}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {new Date(selectedMessageData.created_at).toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> {selectedMessageData.status}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Message</h4>
                      <div className="bg-background p-4 rounded-lg border">
                        <p className="whitespace-pre-wrap">{selectedMessageData.message}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <FaEnvelope className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Message</h3>
                    <p className="text-muted-foreground">
                      Choose a message from the list to view its details
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;

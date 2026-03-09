
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Send, 
  Image, 
  Paperclip, 
  PhoneCall,
  Video,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define message interfaces
interface Message {
  id: string;
  content: string;
  time: string;
  sender: "user" | "other";
  read: boolean;
}

interface Conversation {
  id: string;
  person: {
    name: string;
    avatar?: string;
    initials: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      person: {
        name: "Dealer - Porsche Mumbai",
        initials: "P"
      },
      lastMessage: "Hi, I'm interested in your 718 Cayman S. Is it still available?",
      lastMessageTime: "10:24 AM",
      unread: 1,
      messages: [
        {
          id: "m1",
          content: "Hi, I'm interested in your 718 Cayman S. Is it still available?",
          time: "10:24 AM",
          sender: "user",
          read: true
        },
        {
          id: "m2",
          content: "Yes, it's still available! Would you like to schedule a test drive?",
          time: "10:30 AM",
          sender: "other",
          read: false
        }
      ]
    },
    {
      id: "2",
      person: {
        name: "BMW Rental Services",
        initials: "B"
      },
      lastMessage: "Your rental for BMW X1 is confirmed for next week.",
      lastMessageTime: "Yesterday",
      unread: 0,
      messages: [
        {
          id: "m1",
          content: "Hello, I'd like to rent the BMW X1 next week",
          time: "Yesterday",
          sender: "user",
          read: true
        },
        {
          id: "m2",
          content: "Sure, we have availability. What dates are you looking for?",
          time: "Yesterday",
          sender: "other",
          read: true
        },
        {
          id: "m3",
          content: "I need it from the 15th to the 18th",
          time: "Yesterday",
          sender: "user",
          read: true
        },
        {
          id: "m4",
          content: "Your rental for BMW X1 is confirmed for next week.",
          time: "Yesterday",
          sender: "other",
          read: true
        }
      ]
    },
    {
      id: "3",
      person: {
        name: "Service Center",
        initials: "S"
      },
      lastMessage: "Your car service is scheduled for 20th May at 11:00 AM.",
      lastMessageTime: "Mon",
      unread: 0,
      messages: [
        {
          id: "m1",
          content: "Hi, I need to schedule a standard service for my car",
          time: "Monday",
          sender: "user",
          read: true
        },
        {
          id: "m2",
          content: "We have availability next week. Would 20th May work for you?",
          time: "Monday",
          sender: "other",
          read: true
        },
        {
          id: "m3",
          content: "Yes, that works. What time?",
          time: "Monday",
          sender: "user",
          read: true
        },
        {
          id: "m4",
          content: "Your car service is scheduled for 20th May at 11:00 AM.",
          time: "Monday",
          sender: "other",
          read: true
        }
      ]
    }
  ]);
  
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleConversationClick = (conversation: Conversation) => {
    // Mark messages as read
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          unread: 0,
          messages: conv.messages.map(msg => ({
            ...msg,
            read: true
          }))
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation(conversation);
  };
  
  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;
    
    // Create new message
    const newMessage: Message = {
      id: `m${new Date().getTime()}`,
      content: messageInput,
      time: "Just now",
      sender: "user",
      read: false
    };
    
    // Add message to conversation
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          lastMessage: messageInput,
          lastMessageTime: "Just now",
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        lastMessage: messageInput,
        lastMessageTime: "Just now",
        messages: [...prev.messages, newMessage]
      };
    });
    setMessageInput("");
    
    // Simulate reply after delay
    setTimeout(() => {
      const replyContent = getAutoReply(activeConversation.id);
      const replyMessage: Message = {
        id: `m${new Date().getTime() + 1}`,
        content: replyContent,
        time: "Just now",
        sender: "other",
        read: false
      };
      
      const updatedWithReply = conversations.map(conv => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            lastMessage: replyContent,
            lastMessageTime: "Just now",
            unread: conv.id !== activeConversation.id ? conv.unread + 1 : conv.unread,
            messages: [...conv.messages, newMessage, replyMessage]
          };
        }
        return conv;
      });
      
      setConversations(updatedWithReply);
      setActiveConversation(prev => {
        if (!prev) return null;
        return {
          ...prev,
          lastMessage: replyContent,
          lastMessageTime: "Just now",
          messages: [...prev.messages, newMessage, replyMessage]
        };
      });
    }, 2000);
  };
  
  // Auto reply based on conversation
  const getAutoReply = (conversationId: string): string => {
    switch(conversationId) {
      case "1":
        return "Would you like to come by tomorrow for a test drive? We have availability in the morning.";
      case "2":
        return "Is there anything else you need for your upcoming BMW X1 rental?";
      case "3":
        return "We'll send you a reminder the day before your service appointment.";
      default:
        return "Thanks for your message. We'll get back to you soon.";
    }
  };
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => 
    conv.person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="h-[calc(100vh-6rem)] bg-card rounded-lg overflow-hidden border border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* Conversation List */}
        <div className="border-r border-border">
          <div className="p-4">
            <h2 className="text-xl font-bold">Messages</h2>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100%-5rem)]">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <div key={conversation.id}>
                  <div
                    className={cn(
                      "flex p-4 gap-3 cursor-pointer hover:bg-secondary/50 transition-colors",
                      activeConversation?.id === conversation.id && "bg-secondary"
                    )}
                    onClick={() => handleConversationClick(conversation)}
                  >
                    <Avatar>
                      <AvatarImage src={conversation.person.avatar} />
                      <AvatarFallback>{conversation.person.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium truncate">{conversation.person.name}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {conversation.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                  <Separator />
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No conversations found
              </div>
            )}
          </ScrollArea>
        </div>
        
        {/* Conversation Content */}
        <div className="md:col-span-2 flex flex-col h-full">
          {activeConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b border-border flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeConversation.person.avatar} />
                    <AvatarFallback>{activeConversation.person.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeConversation.person.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      Online
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <PhoneCall className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={cn(
                        "flex",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div 
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground rounded-br-none" 
                            : "bg-secondary text-secondary-foreground rounded-bl-none"
                        )}
                      >
                        <div>{message.content}</div>
                        <div className={cn(
                          "text-xs mt-1",
                          message.sender === "user" 
                            ? "text-primary-foreground/70" 
                            : "text-secondary-foreground/70"
                        )}>
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

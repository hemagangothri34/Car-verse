import { useState } from "react";
import { Search, Send } from "lucide-react";

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
    avatar: string;
    online: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    person: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=12",
      online: true
    },
    lastMessage: "Would you like to come by tomorrow for a test drive?",
    lastMessageTime: "10:30 AM",
    unread: 2,
    messages: [
      {
        id: "1",
        content: "Hi, I'm interested in the BMW 3 Series.",
        time: "10:20 AM",
        sender: "other",
        read: true
      },
      {
        id: "2",
        content: "Sure! The car is available for a test drive.",
        time: "10:25 AM",
        sender: "user",
        read: true
      }
    ]
  },
  {
    id: "2",
    person: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=47",
      online: false
    },
    lastMessage: "Is there anything else you need?",
    lastMessageTime: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "3",
        content: "Hello, I wanted to ask about the BMW X1 rental.",
        time: "Yesterday",
        sender: "other",
        read: true
      },
      {
        id: "4",
        content: "Yes, it is available.",
        time: "Yesterday",
        sender: "user",
        read: true
      }
    ]
  },
  {
    id: "3",
    person: {
      name: "Mike Wilson",
      avatar: "https://i.pravatar.cc/150?img=33",
      online: true
    },
    lastMessage: "We'll send you a reminder before your appointment.",
    lastMessageTime: "Monday",
    unread: 1,
    messages: [
      {
        id: "5",
        content: "I have a service appointment next week.",
        time: "Monday",
        sender: "other",
        read: true
      },
      {
        id: "6",
        content: "No problem. Your appointment is confirmed.",
        time: "Monday",
        sender: "user",
        read: true
      }
    ]
  }
];

const Messages = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);

  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(initialConversations[0]);

  const [messageInput, setMessageInput] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeConversation) {
      return;
    }

    const userMessageText = messageInput.trim();

    const conversationId = activeConversation.id;

    const newMessage: Message = {
      id: `user-${Date.now()}`,
      content: userMessageText,
      time: "Just now",
      sender: "user",
      read: false
    };

    // -----------------------------
    // 1. Show user's message
    // -----------------------------
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              lastMessage: userMessageText,
              lastMessageTime: "Just now",
              messages: [...conversation.messages, newMessage]
            }
          : conversation
      )
    );

    setActiveConversation((prev) =>
      prev
        ? {
            ...prev,
            lastMessage: userMessageText,
            lastMessageTime: "Just now",
            messages: [...prev.messages, newMessage]
          }
        : null
    );

    // Clear input box
    setMessageInput("");

    // -----------------------------
    // 2. Send message to Flask API
    // -----------------------------
    try {
      const response = await fetch(
        "https://car-verse-0mwf.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: userMessageText
          })
        }
      );

      const data = await response.json();

      // Check API response
      if (!response.ok) {
        throw new Error(
          data.error || "Failed to get response from chatbot"
        );
      }

      // -----------------------------
      // 3. Create chatbot response
      // -----------------------------
      const replyMessage: Message = {
        id: `bot-${Date.now()}`,
        content: data.response,
        time: "Just now",
        sender: "other",
        read: false
      };

      // -----------------------------
      // 4. Add chatbot response
      // -----------------------------
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                lastMessage: data.response,
                lastMessageTime: "Just now",
                messages: [...conversation.messages, replyMessage]
              }
            : conversation
        )
      );

      setActiveConversation((prev) =>
        prev
          ? {
              ...prev,
              lastMessage: data.response,
              lastMessageTime: "Just now",
              messages: [...prev.messages, replyMessage]
            }
          : null
      );
    } catch (error) {
      console.error("Chat API error:", error);

      // -----------------------------
      // 5. Show error message
      // -----------------------------
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content:
          "Sorry, I couldn't connect to the chatbot. Please try again.",
        time: "Just now",
        sender: "other",
        read: false
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, errorMessage]
              }
            : conversation
        )
      );

      setActiveConversation((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, errorMessage]
            }
          : null
      );
    }
  };

  // -----------------------------
  // Search conversations
  // -----------------------------
  const filteredConversations = conversations.filter((conversation) =>
    conversation.person.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full min-h-[600px] bg-white rounded-xl shadow-sm overflow-hidden">
      {/* -------------------------------- */}
      {/* LEFT SIDE - CONVERSATIONS */}
      {/* -------------------------------- */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setActiveConversation(conversation)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 ${
                activeConversation?.id === conversation.id
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={conversation.person.avatar}
                    alt={conversation.person.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {conversation.person.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.person.name}
                    </h3>

                    <span className="text-xs text-gray-400">
                      {conversation.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>

                    {conversation.unread > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------- */}
      {/* RIGHT SIDE - CHAT */}
      {/* -------------------------------- */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConversation.person.avatar}
                  alt={activeConversation.person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {activeConversation.person.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  {activeConversation.person.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {activeConversation.person.online
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">
                      {message.content}
                    </p>

                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-400"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) =>
                    setMessageInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;

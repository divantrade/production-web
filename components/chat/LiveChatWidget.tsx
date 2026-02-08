'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiChat, 
  HiX, 
  HiPaperAirplane, 
  HiUser,
  HiClock,
  HiCheckCircle,
  HiExclamationCircle
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered';
}

interface LiveChatWidgetProps {
  whatsappNumber?: string;
  businessName?: string;
  welcomeMessage?: string;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

const defaultWelcomeMessage = "Hi there! 👋 How can we help you today?";

export default function LiveChatWidget({
  whatsappNumber = '+1234567890', // Replace with actual WhatsApp Business number
  businessName = 'Luxe Films',
  welcomeMessage = defaultWelcomeMessage,
  position = 'bottom-right',
  className = ''
}: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: welcomeMessage,
      sender: 'agent',
      timestamp: new Date(),
      status: 'delivered'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showUserForm, setShowUserForm] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate agent responses
  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
      
      const responses = [
        "Thanks for reaching out! Let me help you with that.",
        "I'll connect you with one of our specialists right away.",
        "That's a great question! Let me get you more information.",
        "I'd be happy to discuss your project requirements.",
        "Let me transfer you to WhatsApp where we can continue this conversation."
      ];

      setTimeout(() => {
        setIsTyping(false);
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text: response,
          sender: 'agent',
          timestamp: new Date(),
          status: 'delivered'
        };

        setMessages(prev => [...prev, newMessage]);
        
        if (!isOpen) {
          setHasNewMessage(true);
        }
      }, 1500 + Math.random() * 1000);
    }
  }, [messages, isOpen]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);
  };

  const redirectToWhatsApp = () => {
    const conversation = messages
      .filter(msg => msg.sender === 'user')
      .map(msg => msg.text)
      .join('\n');
    
    const whatsappMessage = `Hi ${businessName}! ${conversation ? `\n\nPrevious conversation:\n${conversation}` : ''}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-4 right-4' 
    : 'bottom-4 left-4';

  return (
    <div className={`fixed ${positionClasses} z-50 ${className}`}>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
          >
            <HiChat className="w-8 h-8 text-white" />
            
            {/* Online status indicator */}
            {isOnline && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}

            {/* New message notification */}
            {hasNewMessage && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">!</span>
              </motion.div>
            )}

            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <HiUser className="w-5 h-5" />
                  </div>
                  {isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{businessName}</h3>
                  <p className="text-xs opacity-90">
                    {isOnline ? 'Online now' : 'Usually responds in 1 hour'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className={`flex items-center mt-1 space-x-1 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className={`text-xs ${
                        message.sender === 'user' ? 'text-white opacity-75' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </span>
                      {message.sender === 'user' && (
                        <div className="text-white opacity-75">
                          {message.status === 'sending' && <HiClock className="w-3 h-3" />}
                          {message.status === 'sent' && <HiCheckCircle className="w-3 h-3" />}
                          {message.status === 'delivered' && (
                            <div className="flex">
                              <HiCheckCircle className="w-3 h-3" />
                              <HiCheckCircle className="w-3 h-3 -ml-1" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp transition button */}
            {messages.length > 2 && (
              <div className="px-4 pb-2">
                <button
                  onClick={redirectToWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Continue on WhatsApp</span>
                </button>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-10 h-10 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <HiPaperAirplane className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by WhatsApp Business
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
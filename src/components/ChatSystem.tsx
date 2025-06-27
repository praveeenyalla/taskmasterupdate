
import { useState } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  avatar: string;
}

interface ChatSystemProps {
  teamMembers: any[];
  currentUser: string;
}

export const ChatSystem = ({ teamMembers, currentUser }: ChatSystemProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Sarah Chen',
      message: 'Hey team! Just finished the wireframes for the landing page. What do you think?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      avatar: 'SC'
    },
    {
      id: '2',
      sender: 'Mike Johnson',
      message: 'Looks great! I\'ll start working on the backend API integration.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      avatar: 'MJ'
    },
    {
      id: '3',
      sender: 'Alex Rodriguez',
      message: 'The authentication module is almost ready. Should be done by tomorrow.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      avatar: 'AR'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: currentUser,
        message: newMessage,
        timestamp: new Date(),
        avatar: currentUser.split(' ').map(n => n[0]).join('')
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Team Chat</h3>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">
            {teamMembers.filter(m => m.status === 'online').length} online
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <ScrollArea className="h-80 pr-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {message.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-900">
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

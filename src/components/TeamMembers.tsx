
import { User, Mail, Phone, MoreVertical, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Lead Designer',
    email: 'sarah@company.com',
    avatar: 'SC',
    status: 'online',
    tasksCount: 5,
    color: 'from-pink-400 to-red-500'
  },
  {
    id: '2',
    name: 'Mike Johnson',
    role: 'Full Stack Developer',
    email: 'mike@company.com',
    avatar: 'MJ',
    status: 'online',
    tasksCount: 3,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    role: 'Backend Developer',
    email: 'alex@company.com',
    avatar: 'AR',
    status: 'away',
    tasksCount: 4,
    color: 'from-green-400 to-teal-500'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    role: 'Product Manager',
    email: 'emma@company.com',
    avatar: 'EW',
    status: 'online',
    tasksCount: 2,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'DevOps Engineer',
    email: 'david@company.com',
    avatar: 'DK',
    status: 'offline',
    tasksCount: 1,
    color: 'from-yellow-400 to-orange-500'
  }
];

export const TeamMembers = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {teamMembers.length} members
        </Badge>
      </div>

      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50/80 transition-colors">
            <div className="relative">
              <div className={`w-10 h-10 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                {member.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900 text-sm truncate">
                  {member.name}
                </h4>
                <Badge variant="outline" className="text-xs bg-gray-50">
                  {member.tasksCount} tasks
                </Badge>
              </div>
              <p className="text-xs text-gray-500 truncate">{member.role}</p>
            </div>

            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Activity className="h-4 w-4" />
            <span>Team Activity</span>
          </div>
          <span className="text-green-600 font-medium">
            {teamMembers.filter(m => m.status === 'online').length} online
          </span>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="text-xs text-gray-500">
            • Sarah completed "Design system update"
          </div>
          <div className="text-xs text-gray-500">
            • Mike started working on "API integration"
          </div>
          <div className="text-xs text-gray-500">
            • Alex reviewed "Authentication module"
          </div>
        </div>
      </div>
    </div>
  );
};

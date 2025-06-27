
import { Calendar, User, AlertCircle, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  labels: string[];
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const labelColors = [
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-teal-100 text-teal-800'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm leading-tight pr-2">
          {task.title}
        </h4>
        <Badge
          variant="outline"
          className={`text-xs ${priorityColors[task.priority]} capitalize`}
        >
          {task.priority}
        </Badge>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {task.description}
      </p>

      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.labels.map((label, index) => (
            <Badge
              key={label}
              variant="secondary"
              className={`text-xs ${labelColors[index % labelColors.length]}`}
            >
              <Tag className="h-3 w-3 mr-1" />
              {label}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>{task.assignee}</span>
        </div>
        
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

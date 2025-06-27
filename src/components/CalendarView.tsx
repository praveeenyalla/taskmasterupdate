
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: string;
  assignee: string;
}

interface CalendarViewProps {
  tasks: Task[];
}

export const CalendarView = ({ tasks }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const getTaskProgress = () => {
    const completed = tasks.filter(task => task.status === 'done').length;
    const total = tasks.length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const tasksForSelectedDate = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Calendar & Progress</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Overall Progress</h4>
            <Progress value={getTaskProgress()} className="mb-2" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{tasks.filter(t => t.status === 'done').length} completed</span>
              <span>{tasks.length} total tasks</span>
            </div>
          </div>

          {selectedDate && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Tasks for {selectedDate.toLocaleDateString()}
              </h4>
              
              {tasksForSelectedDate.length > 0 ? (
                <div className="space-y-2">
                  {tasksForSelectedDate.map((task) => (
                    <div key={task.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm">{task.title}</h5>
                        <Badge
                          variant={task.status === 'done' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {task.status === 'done' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{task.assignee}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No tasks scheduled for this date.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

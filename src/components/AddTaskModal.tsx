
import { useState } from 'react';
import { X, Calendar, User, AlertCircle, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Task {
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  labels: string[];
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
}

const teamMembers = [
  'Sarah Chen',
  'Mike Johnson',
  'Alex Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Lisa Thompson'
];

const availableLabels = [
  'Frontend',
  'Backend',
  'Design',
  'UI/UX',
  'DevOps',
  'Testing',
  'Documentation',
  'Security',
  'Mobile',
  'API'
];

export const AddTaskModal = ({ isOpen, onClose, onAddTask }: AddTaskModalProps) => {
  const [formData, setFormData] = useState<Task>({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    dueDate: '',
    labels: []
  });

  const [labelInput, setLabelInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onAddTask(formData);
    setFormData({
      title: '',
      description: '',
      assignee: '',
      priority: 'medium',
      dueDate: '',
      labels: []
    });
    setLabelInput('');
  };

  const addLabel = (label: string) => {
    if (label && !formData.labels.includes(label)) {
      setFormData({
        ...formData,
        labels: [...formData.labels, label]
      });
    }
    setLabelInput('');
  };

  const removeLabel = (labelToRemove: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter(label => label !== labelToRemove)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the task..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignee
              </label>
              <Select
                value={formData.assignee}
                onValueChange={(value) => setFormData({ ...formData, assignee: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member} value={member}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {member}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <Select
                value={formData.priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labels
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.labels.map((label) => (
                <Badge
                  key={label}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
                  onClick={() => removeLabel(label)}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {label}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
            <Select onValueChange={addLabel}>
              <SelectTrigger>
                <SelectValue placeholder="Add label" />
              </SelectTrigger>
              <SelectContent>
                {availableLabels
                  .filter(label => !formData.labels.includes(label))
                  .map((label) => (
                    <SelectItem key={label} value={label}>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        {label}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Create Task
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

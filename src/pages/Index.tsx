import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Header } from '@/components/Header';
import { TaskCard } from '@/components/TaskCard';
import { AddTaskModal } from '@/components/AddTaskModal';
import { TeamMembers } from '@/components/TeamMembers';
import { SearchModal } from '@/components/SearchModal';
import { NotificationPanel } from '@/components/NotificationPanel';
import { SettingsPanel } from '@/components/SettingsPanel';
import { LoginModal } from '@/components/LoginModal';
import { CalendarView } from '@/components/CalendarView';
import { AnalyticsCharts } from '@/components/AnalyticsCharts';
import { ChatSystem } from '@/components/ChatSystem';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        title: 'Design landing page',
        description: 'Create wireframes and mockups for the new landing page',
        assignee: 'Sarah Chen',
        priority: 'high' as const,
        dueDate: '2024-07-01',
        labels: ['Design', 'UI/UX'],
        createdAt: '2024-06-25'
      },
      {
        id: '2',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated deployment and testing',
        assignee: 'Mike Johnson',
        priority: 'medium' as const,
        labels: ['DevOps', 'Backend'],
        createdAt: '2024-06-24'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: '3',
        title: 'Implement authentication',
        description: 'Add login and registration functionality',
        assignee: 'Alex Rodriguez',
        priority: 'high' as const,
        dueDate: '2024-06-30',
        labels: ['Backend', 'Security'],
        createdAt: '2024-06-23'
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: '4',
        title: 'Update documentation',
        description: 'Review and update API documentation',
        assignee: 'Emma Wilson',
        priority: 'low' as const,
        labels: ['Documentation'],
        createdAt: '2024-06-22'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '5',
        title: 'Setup project structure',
        description: 'Initialize React project with TypeScript',
        assignee: 'Mike Johnson',
        priority: 'medium' as const,
        labels: ['Setup', 'Frontend'],
        createdAt: '2024-06-20'
      }
    ]
  }
];

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

const Index = () => {
  const [columns, setColumns] = useState(initialData);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('todo');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const sourceTask = sourceColumn.tasks.find(task => task.id === draggableId);
    if (!sourceTask) return;

    const newColumns = columns.map(column => {
      if (column.id === source.droppableId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== draggableId)
        };
      }
      if (column.id === destination.droppableId) {
        const newTasks = [...column.tasks];
        newTasks.splice(destination.index, 0, sourceTask);
        return {
          ...column,
          tasks: newTasks
        };
      }
      return column;
    });

    setColumns(newColumns);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setColumns(columns.map(column => 
      column.id === selectedColumn 
        ? { ...column, tasks: [...column.tasks, newTask] }
        : column
    ));
    setIsAddTaskOpen(false);
  };

  const openAddTask = (columnId: string) => {
    setSelectedColumn(columnId);
    setIsAddTaskOpen(true);
  };

  const getAllTasks = () => {
    return columns.flatMap(column => 
      column.tasks.map(task => ({ ...task, status: column.id }))
    );
  };

  const handleTaskSelect = (task: any) => {
    console.log('Selected task:', task);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {columns.map((column) => (
                    <div key={column.id} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                          {column.title}
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            {column.tasks.length}
                          </span>
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openAddTask(column.id)}
                          className="h-8 w-8 p-0 hover:bg-blue-50 text-blue-600"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`space-y-3 min-h-[200px] p-2 rounded-lg transition-colors ${
                              snapshot.isDraggingOver ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            {column.tasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`transform transition-transform ${
                                      snapshot.isDragging ? 'rotate-3 scale-105' : ''
                                    }`}
                                  >
                                    <TaskCard task={task} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
            <div className="space-y-6">
              <TeamMembers />
              <ChatSystem teamMembers={teamMembers} currentUser={currentUser?.name || 'Guest'} />
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="space-y-6">
            <CalendarView tasks={getAllTasks()} />
          </div>
        );
      
      case 'team':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TeamMembers />
            <ChatSystem teamMembers={teamMembers} currentUser={currentUser?.name || 'Guest'} />
          </div>
        );
      
      case 'reports':
        return (
          <AnalyticsCharts tasks={getAllTasks()} teamMembers={teamMembers} />
        );
      
      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard': return 'Project Dashboard';
      case 'projects': return 'Project Calendar & Progress';
      case 'team': return 'Team Collaboration';
      case 'reports': return 'Analytics & Reports';
      default: return 'Dashboard';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'dashboard': return 'Manage your tasks and collaborate with your team';
      case 'projects': return 'Track project progress and deadlines';
      case 'team': return 'Connect and communicate with your team members';
      case 'reports': return 'View insights and analytics for your projects';
      default: return 'Manage your tasks and collaborate with your team';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        currentUser={currentUser}
        onSearchClick={() => setIsSearchOpen(true)}
        onNotificationClick={() => setIsNotificationOpen(true)}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        onNavClick={setActiveSection}
        activeSection={activeSection}
      />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{getSectionTitle()}</h1>
          <p className="text-gray-600">{getSectionDescription()}</p>
        </div>

        {renderActiveSection()}
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={addTask}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tasks={getAllTasks()}
        onTaskSelect={handleTaskSelect}
      />

      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={setCurrentUser}
      />
    </div>
  );
};

export default Index;

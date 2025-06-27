
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Header } from '@/components/Header';
import { TaskCard } from '@/components/TaskCard';
import { AddTaskModal } from '@/components/AddTaskModal';
import { TeamMembers } from '@/components/TeamMembers';
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
        priority: 'high',
        dueDate: '2024-07-01',
        labels: ['Design', 'UI/UX'],
        createdAt: '2024-06-25'
      },
      {
        id: '2',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated deployment and testing',
        assignee: 'Mike Johnson',
        priority: 'medium',
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
        priority: 'high',
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
        priority: 'low',
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
        priority: 'medium',
        labels: ['Setup', 'Frontend'],
        createdAt: '2024-06-20'
      }
    ]
  }
];

const Index = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('todo');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Dashboard</h1>
              <p className="text-gray-600">Manage your tasks and collaborate with your team</p>
            </div>

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

          <div className="lg:w-80">
            <TeamMembers />
          </div>
        </div>
      </div>

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
};

export default Index;

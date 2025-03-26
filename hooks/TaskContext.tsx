import { Task } from '@/types/task';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';

// Create Context
const ThemeContext = createContext({
  tasks: [] as Task[],
  activeTask: null as Task | null,
  setTasks: (tasks: Task[]) => {},
  createTask: (newTaskTitle: Task['title']) => {},
  stopTask: (task: Task) => {},
  pauseTask: (task: Task) => {},
  startTask: (task: Task) => {},
});

// Create Provider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Keeps interval reference

  const createTask = (newTaskTitle: Task['title']) => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      totalTime: 0,
      isRunning: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
      entries: [],
    };

    setTasks([newTask, ...tasks]);
  };

  const stopTask = (task: Task) => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    if (task.isRunning) {
      setTasks((currentTasks) =>
        currentTasks
          .map((t) =>
            t.id === task.id
              ? {
                  ...t,
                  isRunning: false,
                  isCompleted: true,
                  updatedAt: new Date(),
                }
              : t
          )
          .filter((t) => !t.isCompleted)
      );
      setActiveTask(null);
    }
  };

  const pauseTask = (task: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((t) =>
        t.id === task.id ? { ...t, isRunning: false } : t
      )
    );
    setActiveTask({ ...task, isRunning: false });
    // clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  const startTask = (task: Task) => {
    if (!task.isRunning) {
      setTasks((currentTasks) =>
        currentTasks.map((t) =>
          t.id === task.id
            ? { ...t, isRunning: true, updatedAt: new Date() }
            : { ...t, isRunning: false }
        )
      );
      setActiveTask(task);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTasks(
        (
          prevTasks // ✅ Using functional update to get latest state
        ) =>
          prevTasks.map((task) =>
            task.isRunning ? { ...task, totalTime: task.totalTime + 1 } : task
          )
      );
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        tasks,
        activeTask,
        createTask,
        stopTask,
        pauseTask,
        startTask,
        setTasks,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

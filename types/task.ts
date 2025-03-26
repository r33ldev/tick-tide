export interface Task {
  id: string;
  title: string;
  description?: string;
  totalTime: number; // in seconds
  isRunning: boolean;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  entries: TimeEntry[];
}

export interface TimeEntry {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
}
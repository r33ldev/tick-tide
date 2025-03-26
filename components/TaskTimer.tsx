import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDuration } from '@/utils/time';
import { Task } from '@/types/task';
import TaskContext from '@/hooks/TaskContext';

interface TaskTimerProps {
  // task: Task;
  // btnFn: (t: Task) => void;
  // tasks: Task[];
}

export function TaskTimer({}: TaskTimerProps) {
  const { tasks, activeTask: task, stopTask, startTask } = useContext(TaskContext);
  const [active, setActive] = React.useState<Task | null>(null);
  useEffect(() => {
    tasks.map((t) => setActive(t.id === task?.id && t.isRunning ? t : task));
  }, [ task, tasks  ]);
  console.log('active', active?.isRunning);
  if(!task) return <></>
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatDuration(active?.totalTime || 0)}</Text>
      {task && <Text style={styles.taskTitle}>{task.title}</Text>}

      <div
        onClick={() => {
          if (task.isRunning) {
            stopTask(task);
          } else if (!task.isRunning) {
            startTask(task);
          }
        }}
      >
        <Text
          style={[
            styles.status,
            active?.isRunning ? styles.stopped : styles.running,
          ]}
        >
          {active?.isRunning ? 'Stop' : 'Continue'}
        </Text>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#2a2a2a',
    margin: 16,
    borderRadius: 16,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  running: {
    backgroundColor: '#00ff9d33',
    color: '#00ff9d',
  },
  stopped: {
    backgroundColor: '#ff4d4d33',
    color: '#ff4d4d',
  },
});

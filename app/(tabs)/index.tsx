import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { TaskTimer } from '@/components/TaskTimer';
import { TaskList } from '@/components/TaskList';
import { Task } from '@/types/task';
import { Plus } from 'lucide-react-native';
import TaskContext from '@/hooks/TaskContext';

export default function TimerScreen() {
  // const [tasks, setTasks] = useState<Task[]>([]);
  // const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const {
    tasks,
    setTasks,
    createTask,
    stopTask,
    pauseTask,
    startTask,
    activeTask,
  } = useContext(TaskContext);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTasks(
  //       tasks.map((task) =>
  //         task.isRunning ? { ...task, totalTime: task.totalTime + 1 } : task
  //       )
  //     );
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleBtnfn = (task: Task) => {
    if (task.isRunning) {
      stopTask(task);
    } else if (!task.isRunning) {
      startTask(task);
    }
  };

  const handleTaskSelect = (task: Task) => {
    if (task.isRunning) {
      pauseTask(task);
    } else if (!task.isRunning) {
      startTask(task);
    }
  };

  const activeTasks = tasks.filter((task) => !task.isCompleted);
  // const currentTime = activeTask?.totalTime || 0;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Time Trackerss</Text>
        <Text style={styles.subtitle}>Track your productivity</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What are you working on?"
          placeholderTextColor="#666"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <Pressable
          style={styles.addButton}
          onPress={() => {
            createTask(newTaskTitle);
            setNewTaskTitle('');
          }}
        >
          <Plus size={24} color="#fff" />
        </Pressable>
      </View>

      {activeTask && (
        <TaskTimer />
      )}

      <TaskList tasks={activeTasks} onTaskSelect={handleTaskSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#00ff9d',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

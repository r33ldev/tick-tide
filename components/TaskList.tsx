import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Task } from '@/types/task';
import { formatDuration } from '@/utils/time';
import { Play, Pause } from 'lucide-react-native';

interface TaskListProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
}

export function TaskList({ tasks, onTaskSelect }: TaskListProps) {
  const renderItem = ({ item }: { item: Task }) => (
    <Pressable style={styles.taskItem} onPress={() => onTaskSelect(item)}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskTime}>{formatDuration(item.totalTime)}</Text>
      </View>
      {item.isRunning ? (
        <Pause size={20} color="#00ff9d" />
      ) : (
        <Play size={20} color="#888" />
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={tasks}
        renderItem={renderItem}
        estimatedItemSize={72}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    color: '#888',
  },
});

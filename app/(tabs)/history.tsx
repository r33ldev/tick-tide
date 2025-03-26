import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { formatDate, formatDuration } from '@/utils/time';
import { Task } from '@/types/task';
import { Clock } from 'lucide-react-native';
import TaskContext from '@/hooks/TaskContext';

export default function HistoryScreen() {
  const { tasks } = useContext(TaskContext);
  console.log('takssss: ', tasks);
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDate}>{formatDate(item.createdAt)}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Clock size={16} color="#00ff9d" />
        <Text style={styles.taskTime}>{formatDuration(item.totalTime)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>Completed tasks</Text>
      </View>

      <FlashList
        data={tasks}
        renderItem={renderItem}
        estimatedItemSize={88}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No completed tasks yet</Text>
            <Text style={styles.emptySubtext}>
              Tasks will appear here when you stop tracking time
            </Text>
          </View>
        }
      />
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
  taskItem: {
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  taskDate: {
    fontSize: 14,
    color: '#888',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskTime: {
    fontSize: 14,
    color: '#00ff9d',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

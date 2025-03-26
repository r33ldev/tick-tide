import { format, formatDuration as formatDateFnsDuration, intervalToDuration } from 'date-fns';

export function formatDuration(seconds: number) {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
}

export function formatDate(date: Date) {
  return format(date, 'MMM dd, yyyy');
}
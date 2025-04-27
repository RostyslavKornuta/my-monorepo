export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h24'
  };
  return date.toLocaleDateString('en-US', options);
}

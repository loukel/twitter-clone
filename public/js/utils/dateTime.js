const formatDateTime = (dateTime) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  }
  const newDateTime = dateTime
    .toLocaleString('en-UK', options)
    .split(',')
    .join('')
  return newDateTime
}

export {
  formatDateTime,
}
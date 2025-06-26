export const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

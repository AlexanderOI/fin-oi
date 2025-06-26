export const formatDecimal = (text: string) => {
  let cleanText = text.replace(/[^0-9.,]/g, '')

  cleanText = cleanText.replace(',', '.')

  const parts = cleanText.split('.')
  if (parts.length > 2) {
    cleanText = parts[0] + '.' + parts.slice(1).join('')
  }

  if (parts.length === 2 && parts[1].length > 2) {
    cleanText = parts[0] + '.' + parts[1].substring(0, 2)
  }

  return cleanText
}

export function formatNumber(number: number): string {
  return number.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

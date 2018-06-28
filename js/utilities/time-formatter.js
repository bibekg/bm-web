// @flow

export const formatTime = (hour: number): string => {
  const h = hour === 12 || hour === 24 ? 12 : hour % 12
  const abb = hour < 12 || hour === 24 ? 'am' : 'pm'
  return `${h}${abb}`
}

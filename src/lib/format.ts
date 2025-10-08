import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

export const formatNumber = (num: number, showDecimals = false) => {
  if (showDecimals) {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return new Intl.NumberFormat('es-ES').format(num)
}

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format('D [de] MMMM [de] YYYY')
}

export const formatTime = (nanoseconds: number) => {
  const NS = 1
  const μS = 1e3
  const MS = 1e6
  const S = 1e9
  const MIN = 6e10

  const units = [
    { value: NS, unit: 'ns' },
    { value: μS, unit: 'μs' },
    { value: MS, unit: 'ms' },
    { value: S, unit: 's' },
    { value: MIN, unit: 'min' },
  ]

  let bestUnit = units[0]!

  for (const unit of units) {
    if (nanoseconds >= unit.value) {
      bestUnit = unit
    } else {
      break
    }
  }

  const value = nanoseconds / bestUnit.value
  const formattedValue = formatNumber(value, true)

  return `${formattedValue} ${bestUnit.unit}`
}

export const formatMemory = (bytes: number) => {
  const KB = 1024
  const MB = KB * 1024
  const GB = MB * 1024
  const TB = GB * 1024

  const units = [
    { value: 1, unit: 'B' },
    { value: KB, unit: 'KB' },
    { value: MB, unit: 'MB' },
    { value: GB, unit: 'GB' },
    { value: TB, unit: 'TB' },
  ]

  let bestUnit = units[0]!

  for (const unit of units) {
    if (bytes >= unit.value) {
      bestUnit = unit
    } else {
      break
    }
  }

  const value = bytes / bestUnit.value
  const formattedValue = formatNumber(value, true)

  return `${formattedValue} ${bestUnit.unit}`
}

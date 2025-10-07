import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { formatMemory, formatNumber, formatTime } from '~/lib/format'
import { Metric } from '~/types/algorithm-result'

interface MetricSelectProps {
  value: Metric
  className?: string
  onValueChange: (value: Metric) => void
}

export const getMetricLabel = (metric: Metric) => {
  const labels = {
    [Metric.MEMORY]: 'Uso de memoria',
    [Metric.TIME]: 'Tiempo de ejecución',
    [Metric.COMPARISONS]: 'Número de comparaciones',
  }
  return labels[metric]
}

export const getMetricValue = (metric: Metric, value: number) => {
  if (metric === Metric.TIME) {
    return formatTime(value)
  }
  if (metric === Metric.MEMORY) {
    return formatMemory(value)
  }
  return formatNumber(value)
}

export const MetricSelect = ({
  value,
  onValueChange,
  className = '',
}: MetricSelectProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="text-sm text-slate-400">Ordenar por:</span>
    <Select
      value={value}
      onValueChange={(value) => onValueChange(value as Metric)}
    >
      <SelectTrigger className="w-[220px] glass bg-slate-800/40 border-slate-700/50 text-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="glass bg-slate-800 border-slate-700">
        <SelectItem
          value={Metric.TIME}
          className="text-slate-200 focus:bg-slate-200 focus:text-black"
        >
          {getMetricLabel(Metric.TIME)}
        </SelectItem>
        <SelectItem
          value={Metric.COMPARISONS}
          className="text-slate-200 focus:bg-slate-200 focus:text-black"
        >
          {getMetricLabel(Metric.COMPARISONS)}
        </SelectItem>
        <SelectItem
          value={Metric.MEMORY}
          className="text-slate-200 focus:bg-slate-200 focus:text-black"
        >
          {getMetricLabel(Metric.MEMORY)}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
)

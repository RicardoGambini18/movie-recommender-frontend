import { Award, Medal, Trophy } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { formatNumber } from '~/lib/format'
import { type AlgorithmResult, Metric } from '~/types/algorithm-result'

import { getMetricLabel, getMetricValue } from './metric-select'

interface ResultCardProps {
  index: number
  className?: string
  selectedMetric: Metric
  result: AlgorithmResult
}

const getRankIcon = (index: number) => {
  if (index === 0) return <Trophy className="w-5 h-5 text-yellow-400" />
  if (index === 1) return <Medal className="w-5 h-5 text-slate-200" />
  if (index === 2) return <Award className="w-5 h-5 text-orange-300" />
  return null
}

const getRankColor = (index: number) => {
  if (index === 0) return 'border-yellow-400/50 bg-yellow-400/10'
  if (index === 1) return 'border-slate-300/50 bg-slate-300/10'
  if (index === 2) return 'border-orange-300/50 bg-orange-300/10'
  return 'border-slate-700/50 bg-slate-900/20'
}

const getMetricHighlightColor = (index: number) => {
  if (index === 0) return 'bg-yellow-400/5 border-yellow-400/20 text-yellow-400'
  if (index === 1) return 'bg-slate-300/5 border-slate-300/20 text-slate-200'
  if (index === 2) return 'bg-orange-300/5 border-orange-300/20 text-orange-300'
  return 'bg-slate-700/5 border-slate-700/20 text-slate-300'
}

export const ResultCard = ({
  index,
  result,
  className = '',
  selectedMetric,
}: ResultCardProps) => (
  <Card
    className={`glass border-2 transition-all ${getRankColor(index)} ${className}`}
  >
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1">{getRankIcon(index)}</div>
          <div>
            <CardTitle className="text-white mb-1">
              {result.algorithm}
            </CardTitle>
            <p className="text-sm text-slate-400">{result.data_structure}</p>
          </div>
        </div>
        <Badge variant="outline" className="border-slate-600 text-slate-300">
          Posición #{index + 1}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-light bg-slate-900/30 p-4 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Elementos procesados</p>
          <p className="text-xl font-bold text-white">
            {formatNumber(result.item_count)}
          </p>
        </div>
        <div className="glass-light bg-slate-900/30 p-4 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">
            {getMetricLabel(Metric.COMPARISONS)}
          </p>
          <p className="text-xl font-bold text-white">
            {getMetricValue(Metric.COMPARISONS, result.metrics.comparisons)}
          </p>
        </div>
        <div className="glass-light bg-slate-900/30 p-4 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">
            {getMetricLabel(Metric.MEMORY)}
          </p>
          <p className="text-xl font-bold text-white">
            {getMetricValue(Metric.MEMORY, result.metrics.memory)}
          </p>
        </div>
        <div className="glass-light bg-slate-900/30 p-4 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">
            {getMetricLabel(Metric.TIME)}
          </p>
          <p className="text-xl font-bold text-white">
            {getMetricValue(Metric.TIME, result.metrics.time)}
          </p>
        </div>
      </div>
      <div
        className={`mt-4 p-4 glass-light border rounded-lg ${getMetricHighlightColor(index)}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">
            {getMetricLabel(selectedMetric)}
          </span>
          <span className="text-2xl font-bold">
            {getMetricValue(selectedMetric, result.metrics[selectedMetric])}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
)

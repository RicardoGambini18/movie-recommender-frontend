import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'
import { Badge } from '~/components/ui/badge'
import { Checkbox } from '~/components/ui/checkbox'
import { type Algorithm } from '~/types/data-structure'

interface AlgorithmCheckboxProps {
  isSelected: boolean
  algorithm: Algorithm
  onToggle: (algorithmKey: string) => void
}

function renderMathExpression(expression: string) {
  try {
    return <InlineMath math={expression} />
  } catch {
    return <span>{expression}</span>
  }
}

export function AlgorithmCheckbox({
  onToggle,
  algorithm,
  isSelected,
}: Readonly<AlgorithmCheckboxProps>) {
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => onToggle(algorithm.key)}
      className="border border-slate-700/50 rounded-lg p-4 glass-light bg-slate-900/20 cursor-pointer hover:bg-slate-800/40 transition-colors"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle(algorithm.key)
        }
      }}
    >
      <div className="flex items-start gap-3 mb-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(algorithm.key)}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="border-slate-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 data-[state=checked]:text-black mt-1"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 className="text-white font-semibold">{algorithm.name}</h3>
            {algorithm.needs_sort && (
              <Badge
                variant="outline"
                className="border-yellow-400/50 text-yellow-400 bg-yellow-400/10 self-start sm:self-auto"
              >
                Requiere ordenamiento
              </Badge>
            )}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {algorithm.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Complejidad Temporal
              </h4>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Mejor caso:</span>
                  <Badge
                    variant="outline"
                    className="border-green-500/50 text-green-400 bg-green-500/10"
                  >
                    {renderMathExpression(algorithm.best_time_complexity)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Caso promedio:</span>
                  <Badge
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                  >
                    {renderMathExpression(algorithm.average_time_complexity)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Peor caso:</span>
                  <Badge
                    variant="outline"
                    className="border-red-500/50 text-red-400 bg-red-500/10"
                  >
                    {renderMathExpression(algorithm.worst_time_complexity)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Complejidad Espacial
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Caso promedio:</span>
                <Badge
                  variant="outline"
                  className="border-blue-500/50 text-blue-400 bg-blue-500/10"
                >
                  {renderMathExpression(algorithm.space_complexity)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

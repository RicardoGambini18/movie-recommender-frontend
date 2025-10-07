import { type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

interface DataStructureSectionProps {
  name: string
  icon: LucideIcon
  children: ReactNode
  description: string
}

export function DataStructureSection({
  name,
  children,
  icon: Icon,
  description,
}: Readonly<DataStructureSectionProps>) {
  return (
    <Card className="glass bg-slate-800/40 border-slate-700/50">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-yellow-400/10 rounded-lg mt-1">
            <Icon className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-white mb-2">{name}</CardTitle>
            <CardDescription className="text-slate-400 leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">{children}</div>
      </CardContent>
    </Card>
  )
}

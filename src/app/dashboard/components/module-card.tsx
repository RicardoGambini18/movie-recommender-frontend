import { ArrowRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

interface ModuleCardProps {
  href: string
  title: string
  details: string
  icon: LucideIcon
  iconColor?: string
  description: string
}

export function ModuleCard({
  href,
  title,
  details,
  icon: Icon,
  description,
  iconColor = 'text-yellow-400',
}: Readonly<ModuleCardProps>) {
  return (
    <Link href={href} className="group">
      <Card className="glass bg-slate-800/40 border-slate-700/50 hover:border-yellow-400/50 transition-all duration-300 h-full">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-yellow-400/10 rounded-lg">
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
          </div>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription className="text-slate-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">{details}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

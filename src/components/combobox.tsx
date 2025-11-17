'use client'

import { ChevronsUpDown, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import {
  type Value,
  VirtualizedCommand,
  type VirtualizedCommandProps,
} from '~/components/virtualized-command'
import { cn } from '~/lib/utils'

export interface RenderSelectedOptionParams<T = unknown> {
  option: T
  value: Value
  label: string
  icon?: LucideIcon
}

export interface ComboboxProps<T = unknown>
  extends Omit<VirtualizedCommandProps<T>, 'onSelect'> {
  id?: string
  icon?: LucideIcon
  disabled?: boolean
  className?: string
  onBlur?: () => void
  allowClear?: boolean
  placeholder?: string
  buttonClassName?: string
  contentClassName?: string
  onChange: (value: Value) => void
  renderSelectedOption?: (
    props: RenderSelectedOptionParams<T>
  ) => React.ReactNode
}

export function defaultRenderSelectedOption<T = unknown>({
  label,
  icon: Icon,
}: RenderSelectedOptionParams<T>) {
  return (
    <div className="flex flex-1 items-center gap-2">
      {Icon && <Icon className="h-5 w-5 size-5 text-slate-400" />}
      <span className="truncate text-white">{label}</span>
    </div>
  )
}

export function Combobox<T = unknown>({
  id,
  height,
  onBlur,
  options,
  onChange,
  getValue,
  getLabel,
  className,
  emptyText,
  icon: Icon,
  value = '',
  getDisabled,
  renderOption,
  buttonClassName,
  disabled = false,
  contentClassName,
  searchPlaceholder,
  allowClear = false,
  estimatedOptionSize,
  placeholder = 'Selecciona una opción...',
  renderSelectedOption = defaultRenderSelectedOption,
}: Readonly<ComboboxProps<T>>) {
  const wasOpen = useRef(false)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [buttonWidth, setButtonWidth] = useState<number | undefined>()

  useEffect(() => {
    if (open && buttonRef.current) {
      if (!wasOpen.current) wasOpen.current = true
      const width = buttonRef.current.offsetWidth
      setButtonWidth(width)
    } else if (!open && wasOpen.current) {
      onBlur?.()
    }
  }, [open, onBlur])

  const handleBlur = onBlur
    ? () => {
        if (!open) {
          onBlur()
        }
      }
    : undefined

  const selectedOption = options.find((option) => getValue(option) === value)

  const handleSelect = (currentValue: Value) => {
    const newValue = currentValue === value ? '' : currentValue
    onChange(newValue)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
  }

  return (
    <div className={cn('w-fit', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            ref={buttonRef}
            role="combobox"
            variant="outline"
            onBlur={handleBlur}
            disabled={disabled}
            aria-expanded={open}
            className={cn(
              'w-full justify-between h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white focus:border-yellow-400/50 focus:ring-yellow-400/20',
              buttonClassName
            )}
          >
            {selectedOption ? (
              renderSelectedOption({
                value,
                icon: Icon,
                option: selectedOption,
                label: getLabel(selectedOption),
              })
            ) : (
              <div className="flex flex-1 items-center gap-2">
                {Icon && <Icon className="h-5 w-5 size-5 text-slate-400" />}
                <span className="truncate text-slate-400">{placeholder}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              {allowClear && selectedOption && (
                <span
                  tabIndex={0}
                  role="button"
                  onClick={handleClear}
                  className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleClear(e as unknown as React.MouseEvent)
                    }
                  }}
                >
                  ×
                </span>
              )}
              <ChevronsUpDown className="h-4 w-4 size-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'p-0 dark bg-slate-800/95 backdrop-blur-md border-white/10',
            contentClassName
          )}
          style={{ width: buttonWidth ? `${buttonWidth}px` : undefined }}
        >
          <VirtualizedCommand<T>
            value={value}
            height={height}
            options={options}
            getValue={getValue}
            getLabel={getLabel}
            emptyText={emptyText}
            onSelect={handleSelect}
            getDisabled={getDisabled}
            renderOption={renderOption}
            searchPlaceholder={searchPlaceholder}
            estimatedOptionSize={estimatedOptionSize}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

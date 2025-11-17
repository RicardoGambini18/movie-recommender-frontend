import { useVirtualizer } from '@tanstack/react-virtual'
import { Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import { cn } from '~/lib/utils'

export type Value = string | number

export interface RenderOptionParams<T = unknown> {
  option: T
  value: Value
  label: string
  checked: boolean
  disabled: boolean
}

export interface VirtualizedCommandProps<T = unknown> {
  value: Value
  options: T[]
  height?: number
  emptyText?: string
  searchPlaceholder?: string
  estimatedOptionSize: number
  getValue: (option: T) => Value
  getLabel: (option: T) => string
  onSelect: (value: Value) => void
  getDisabled?: (option: T) => boolean
  renderOption?: (props: RenderOptionParams<T>) => React.ReactNode
}

export function defaultRenderOption<T = unknown>({
  label,
  checked,
}: RenderOptionParams<T>) {
  return (
    <>
      <Check
        className={cn('mr-2 h-4 w-4', checked ? 'opacity-100' : 'opacity-0')}
      />
      {label}
    </>
  )
}

export function VirtualizedCommand<T = unknown>({
  value,
  options,
  onSelect,
  getLabel,
  getValue,
  getDisabled,
  height = 400,
  estimatedOptionSize,
  searchPlaceholder = 'Buscar...',
  renderOption = defaultRenderOption,
  emptyText = 'No se encontró la opción.',
}: Readonly<VirtualizedCommandProps<T>>) {
  const parentRef = useRef(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options)
  const [isKeyboardNavActive, setIsKeyboardNavActive] = useState(false)

  const virtualizer = useVirtualizer({
    enabled: true,
    count: filteredOptions.length,
    estimateSize: () => estimatedOptionSize,
    getScrollElement: () => parentRef.current,
  })

  const virtualOptions = virtualizer.getVirtualItems()

  const filteredOptionsLength = filteredOptions.length
  const needsHeightAdjustment =
    filteredOptionsLength <= Math.floor(height - 8 / filteredOptionsLength)

  const processedHeight = useMemo(() => {
    if (filteredOptionsLength === 0) {
      return Math.min(76, height)
    }

    if (needsHeightAdjustment) {
      return filteredOptionsLength * estimatedOptionSize + 8
    }

    return height
  }, [
    height,
    estimatedOptionSize,
    filteredOptionsLength,
    needsHeightAdjustment,
  ])

  const scrollToIndex = (index: number) => {
    virtualizer.scrollToIndex(index, {
      align: 'center',
    })
  }

  const handleSearch = (search: string) => {
    setIsKeyboardNavActive(false)
    setFilteredOptions(
      options.filter((option) =>
        getLabel(option).toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        setIsKeyboardNavActive(true)
        setFocusedIndex((prev) => {
          const newIndex =
            prev === -1 ? 0 : Math.min(prev + 1, filteredOptions.length - 1)
          scrollToIndex(newIndex)
          return newIndex
        })
        break
      }
      case 'ArrowUp': {
        event.preventDefault()
        setIsKeyboardNavActive(true)
        setFocusedIndex((prev) => {
          const newIndex =
            prev === -1 ? filteredOptions.length - 1 : Math.max(prev - 1, 0)
          scrollToIndex(newIndex)
          return newIndex
        })
        break
      }
      case 'Enter': {
        event.preventDefault()
        if (filteredOptions[focusedIndex]) {
          onSelect(getValue(filteredOptions[focusedIndex]))
        }
        break
      }
      default: {
        break
      }
    }
  }

  useEffect(() => {
    if (value) {
      const index = filteredOptions.findIndex(
        (option) => getValue(option) === value
      )

      if (index !== -1) {
        setFocusedIndex(index)
        setIsKeyboardNavActive(true)
        virtualizer.scrollToIndex(index, {
          align: 'center',
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, filteredOptions, virtualizer])

  return (
    <Command
      shouldFilter={false}
      onKeyDown={handleKeyDown}
      className="bg-transparent"
    >
      <CommandInput
        className="h-9"
        onValueChange={handleSearch}
        placeholder={searchPlaceholder}
        wrapperClassName="border-white/10"
      />
      <CommandList
        ref={parentRef}
        onMouseDown={() => setIsKeyboardNavActive(false)}
        onMouseMove={() => setIsKeyboardNavActive(false)}
        style={{
          width: '100%',
          overflow: 'auto',
          height: processedHeight,
        }}
      >
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup>
          <div
            style={{
              width: '100%',
              position: 'relative',
              height: `${virtualizer.getTotalSize()}px`,
            }}
          >
            {virtualOptions.map((virtualOption) => {
              const option = filteredOptions[virtualOption.index]

              if (!option) {
                return (
                  <div
                    key={`${virtualOption.index}-empty`}
                    style={{ height: estimatedOptionSize }}
                  />
                )
              }

              const optionValue = getValue(option)
              const optionLabel = getLabel(option)
              const isChecked = value === optionValue
              const isDisabled = getDisabled?.(option) ?? false
              const isFocused = focusedIndex === virtualOption.index

              return (
                <CommandItem
                  key={optionValue}
                  value={optionLabel}
                  onSelect={() => onSelect(optionValue)}
                  disabled={isKeyboardNavActive || isDisabled}
                  className={cn(
                    'cursor-pointer bg-transparent absolute left-0 top-0 w-full data-[disabled=true]:opacity-100',
                    isKeyboardNavActive &&
                      isFocused &&
                      'bg-white/10 data-[selected=true]:bg-white/10',
                    isKeyboardNavActive &&
                      !isFocused &&
                      'bg-transparent data-[selected=true]:bg-transparent',
                    !isKeyboardNavActive &&
                      !isDisabled &&
                      'data-[selected=true]:bg-white/10',
                    isDisabled &&
                      'data-[disabled=true]:opacity-50 cursor-not-allowed'
                  )}
                  style={{
                    height: estimatedOptionSize,
                    transform: `translateY(${virtualOption.start}px)`,
                  }}
                  onMouseEnter={() =>
                    !isKeyboardNavActive && setFocusedIndex(virtualOption.index)
                  }
                  onMouseLeave={() =>
                    !isKeyboardNavActive && setFocusedIndex(-1)
                  }
                >
                  {renderOption({
                    option,
                    label: optionLabel,
                    value: optionValue,
                    checked: isChecked,
                    disabled: isDisabled,
                  })}
                </CommandItem>
              )
            })}
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

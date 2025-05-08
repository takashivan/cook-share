'use client'

import * as React from 'react'
import { Listbox, ListboxButton, ListboxOption } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// radix-uiにmultiselectのコンポーネントはないので、headlessuiのListboxを使って実装する
const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Listbox>
>(({ className, children, ...props }, ref) => (
  <Listbox ref={ref} {...props}>
    <div className={cn('relative w-full', className)}>
      {typeof children === 'function' ? '' : children}
    </div>
  </Listbox>
))
MultiSelect.displayName = 'MultiSelect'

const MultiSelectButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ListboxButton>
>(({ className, children, ...props }, ref) => (
  <ListboxButton
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 truncate',
      className
    )}
    {...props}
  >
    {typeof children === 'function' ? '' : children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </ListboxButton>
))
MultiSelectButton.displayName = 'MultiSelectButton'

const MultiSelectOptions = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<typeof Listbox.Options>
>(({ className, ...props }, ref) => (
  <Listbox.Options
    ref={ref}
    className={cn(
      'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none p-1',
      className
    )}
    {...props}
  />
))
MultiSelectOptions.displayName = 'MultiSelectOptions'

const MultiSelectOption = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<typeof ListboxOption>
>(({ className, children, ...props }, ref) => (
  <ListboxOption
    ref={ref}
    as={React.Fragment}
    {...props}
  >
    {({ selected }) => (
      <li
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          selected && 'bg-accent text-accent-foreground',
          className
        )}
      >
        <span className="truncate">{typeof children === 'function' ? '' : children}</span>
        {selected && (
          <span className="absolute right-2 flex items-center justify-center">
            <Check className="h-4 w-4" />
          </span>
        )}
      </li>
    )}
  </ListboxOption>
))
MultiSelectOption.displayName = 'MultiSelectOption'

export {
  MultiSelect,
  MultiSelectButton,
  MultiSelectOptions,
  MultiSelectOption,
}

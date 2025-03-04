"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: "ap-south-1",
    label: "AP-SOUTH-1",
  },
]

export default function SelectRegions() { 
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    statuses[0] || null
  )

  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground dark:text-gray-400">Region</p>
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {selectedStatus ? <>{selectedStatus.label}</> : <>+ Region</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 dark:bg-gray-800 dark:border-gray-700" side="right" align="start">
        <Command className="dark:bg-gray-800">
        <CommandInput placeholder="Change status..." className="dark:bg-gray-800 dark:text-gray-300" />
        <CommandList>
          <CommandEmpty className="dark:text-gray-400">No results found.</CommandEmpty>
          <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
            key={status.value}
            value={status.value}
            className="dark:text-gray-300 dark:hover:bg-gray-700"
            onSelect={(value) => {
              setSelectedStatus(
              statuses.find((priority) => priority.value === value) ||
                null
              )
              setOpen(false)
            }}
            >
            {status.label}
            </CommandItem>
          ))}
          </CommandGroup>
        </CommandList>
        </Command>
      </PopoverContent>
      </Popover>
    </div>
  )
}

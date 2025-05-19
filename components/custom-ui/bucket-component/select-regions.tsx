"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Status } from "@/types/select-regions";

const statuses: Status[] = [
  {
    value: "ap-south-1",
    label: "AP-SOUTH-1",
  },
  {
    value: "us-east-1",
    label: "US-EAST-1",
  },
  {
    value: "eu-west-1",
    label: "EU-WEST-1",
  },
];

export default function SelectRegions() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    statuses[0] || null
  );

  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground dark:text-zinc-400">Region</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[120px] justify-start glass-card glass-text"
          >
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Region</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[220px] bg-black/30 backdrop-blur-2xl backdrop-saturate-150 border-[0.5px] border-white/10 shadow-2xl rounded-xl"
          side="bottom"
          align="end"
        >
          <div className="w-full h-full">
            <Command className="w-full h-full bg-transparent">
              <CommandInput placeholder="Change region..." className="" />
              <CommandList>
                <CommandEmpty className="dark:text-zinc-400">
                  No results found.
                </CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      className="dark:text-zinc-300 dark:hover:bg-zinc-700 text-white/80 text-sm px-3 py-2 focus:bg-white/10 focus:text-white"
                      onSelect={(value) => {
                        setSelectedStatus(
                          statuses.find(
                            (priority) => priority.value === value
                          ) || null
                        );
                        setOpen(false);
                      }}
                    >
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

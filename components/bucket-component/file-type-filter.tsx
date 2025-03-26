import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { cn } from "@/lib/utils";

const fileTypes = [
  { value: "all", label: "All Files" },
  { value: "document", label: "Documents" },
  { value: "compressed", label: "Compressed" },
  { value: "image", label: "Images" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
  { value: "folder", label: "Folders" },
];

interface FileTypeFilterProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export default function FileTypeFilter({
  selectedType,
  setSelectedType,
}: FileTypeFilterProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[150px] justify-between"
        >
          {fileTypes.find((type) => type.value === selectedType)?.label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandInput placeholder="File Type" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {fileTypes.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    setSelectedType(currentValue);
                    setOpen(false);
                  }}
                >
                  {type.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedType === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

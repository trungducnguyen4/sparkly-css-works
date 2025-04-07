
import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const learningModes = [
  {
    value: "traditional",
    label: "Truyền thống",
  },
  {
    value: "flashcard",
    label: "Flashcard",
  },
];

export function ModeSelect() {
  const [open, setOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(learningModes[0]);

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-sm text-gray-600">Chế độ học:</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[160px] justify-between bg-white"
          >
            {selectedMode.label}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[160px] p-0">
          <Command>
            <CommandGroup>
              {learningModes.map((mode) => (
                <CommandItem
                  key={mode.value}
                  value={mode.value}
                  onSelect={(value) => {
                    // Instead of using array find, we'll directly map using the index
                    const modeIndex = learningModes.findIndex(m => m.value === value);
                    setSelectedMode(modeIndex !== -1 ? learningModes[modeIndex] : learningModes[0]);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMode.value === mode.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {mode.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

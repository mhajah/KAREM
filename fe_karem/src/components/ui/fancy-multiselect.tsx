import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export type AutocompleteItem = Record<"value" | "label", string>;

interface Props {
  options: AutocompleteItem[];
  onChange?: (values: { value: string; label: string }[]) => void;
  value?: AutocompleteItem[];
}

export const FancyMultiSelect = ({ options, onChange, value }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<AutocompleteItem[]>(value || []);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((item: AutocompleteItem) => {
    setSelected((prev) => prev.filter((s) => s.value !== item.value));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const handleAddCustom = React.useCallback(() => {
    if (inputValue.trim() === "") return;

    const newAutocompleteItem: AutocompleteItem = {
      value: inputValue.trim().toLowerCase(),
      label: inputValue.trim(),
    };

    setSelected((prev) => [...prev, newAutocompleteItem]);
    setInputValue("");
  }, [inputValue]);

  const selectables = options.filter((item) => !selected.some((s) => s.value === item.value));

  React.useEffect(() => {
    if (onChange) onChange?.(selected);
  }, [selected]);

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => {
            return (
              <Badge key={item.value} variant="secondary">
                {item.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="ml-2 flex-1 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="relative">
        {open && (
          <div className="absolute top-full z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((item) => (
                <CommandItem
                  key={item.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setInputValue("");
                    setSelected((prev) => [...prev, item]);
                  }}
                  className="cursor-pointer"
                >
                  {item.label}
                </CommandItem>
              ))}
              {/* Dodanie własnej wartości */}
              {inputValue.trim() !== "" && !options.some((f) => f.value === inputValue.trim().toLowerCase()) && (
                <CommandItem
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={handleAddCustom}
                  className="cursor-pointer font-medium text-primary"
                >
                  Dodaj: <strong>{inputValue}</strong>
                </CommandItem>
              )}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
};

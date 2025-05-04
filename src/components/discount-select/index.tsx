import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
type DiscountSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const DiscountSelect = ({ value, onChange }: DiscountSelectProps) => {
  console.log("value", value);
  const [open, setOpen] = useState(false);
  const discountList = [
    { label: "Baht", value: "fixed" },
    { label: "Percent", value: "percent" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-background hover:bg-background border-input justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value
              ? discountList.find((discount) => discount.value === value)?.label
              : "Select discount type"}
          </span>
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground/80 shrink-0"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {discountList.map((discount) => (
                <CommandItem
                  className="w-full"
                  key={discount.value}
                  value={discount.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {discount.label}
                  {value === discount.value && (
                    <CheckIcon size={16} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DiscountSelect;

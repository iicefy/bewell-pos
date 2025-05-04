import { Group, Input, NumberField } from "react-aria-components";

type NumberInputProps = {
  value: number;
  onChange: (val: number) => void;
  disabled: boolean;
  type: string;
  max?: number; // Added max prop
};

const NumberInput = ({
  value,
  onChange,
  disabled,
  type,
  max,
}: NumberInputProps) => {
  const effectiveMax = type === "percent" ? 100 : max;

  const handleChange = (val: number) => {
    if (val >= 0 && (effectiveMax === undefined || val <= effectiveMax)) {
      onChange(val);
    }
  };

  return (
    <NumberField
      defaultValue={99}
      formatOptions={{
        style: type === "percent" ? "percent" : "decimal",
        currencySign: "standard",
      }}
      value={value}
      onChange={handleChange}
      isDisabled={disabled}
      className={"w-[100px]"}
    >
      <div className="*:not-first:mt-2">
        <Group className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
          <Input
            className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums"
            placeholder="Input discount amount"
          />
        </Group>
      </div>
    </NumberField>
  );
};

export default NumberInput;

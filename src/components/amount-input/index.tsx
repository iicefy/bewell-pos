import { ChevronDownIcon, ChevronUpIcon, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

type AmountInputProps = {
  value: number;
  onAdd?: () => void;
  onDeduct?: () => void;
  min?: number;
  max?: number;
};

const AmountInput = ({
  value,
  onAdd,
  onDeduct,
  min,
  max,
}: AmountInputProps) => {
  if (value === 0) {
    return (
      <Button onClick={() => onAdd?.()}>
        <ShoppingCart size={16} aria-hidden="true" />
      </Button>
    );
  }

  return (
    <div className="inline-flex rounded-full justify-start">
      <Button
        aria-label="Downvote"
        onClick={() => onDeduct?.()}
        disabled={value <= 0 || value <= (min || 0)}
        aria-disabled={value <= 0 || value <= (min || 0) ? true : undefined}
      >
        <ChevronDownIcon size={16} aria-hidden="true" />
      </Button>
      <span className="px-4 flex items-center justify-center">{value}</span>
      <Button
        aria-label="Upvote"
        onClick={() => onAdd?.()}
        disabled={max ? value >= max : false}
      >
        <ChevronUpIcon size={16} aria-hidden="true" />
      </Button>
    </div>
  );
};

export default AmountInput;

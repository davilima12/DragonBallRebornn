import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { VocationWithUrl } from "@/types/vocation";

interface VocationSelectProps {
  label: string;
  vocations: VocationWithUrl[];
  onSelect: (vocation: VocationWithUrl) => void;
  required?: boolean;
}

export default function VocationSelect({ 
  label, 
  vocations, 
  onSelect,
  required = false 
}: VocationSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<VocationWithUrl | null>(null);

  function handleSelect(vocation: VocationWithUrl) {
    setSelected(vocation);
    onSelect(vocation);
    setIsOpen(false);
  }

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-6">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={toggleOpen}
          className="relative w-full cursor-pointer rounded-md bg-background border border-input py-2.5 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm"
          data-testid="button-vocation-select"
        >
          <span className="flex items-center">
            {selected ? (
              <>
                <img
                  src={selected.url}
                  alt={selected.name}
                  className="h-6 w-6 flex-shrink-0 pixelated"
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Escolha uma vocation</span>
            )}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background border border-input py-1 text-base shadow-lg focus:outline-none sm:text-sm"
            role="listbox"
          >
            {vocations.map((vocation) => (
              <li
                key={vocation.id}
                className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover-elevate"
                role="option"
                onClick={() => handleSelect(vocation)}
                data-testid={`option-vocation-${vocation.id}`}
              >
                <div className="flex items-center">
                  <img
                    src={vocation.url}
                    alt={vocation.name}
                    className="h-6 w-6 flex-shrink-0 pixelated"
                  />
                  <span className="ml-3 block truncate font-normal">
                    {vocation.name}
                  </span>
                </div>

                {selected?.id === vocation.id && (
                  <span className="text-primary absolute inset-y-0 right-0 flex items-center pr-4">
                    <Check className="h-5 w-5" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

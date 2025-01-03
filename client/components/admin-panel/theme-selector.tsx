import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react"
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/components/providers/theme-color-provider"
import { ThemeColors } from "@/types/theme-types";

interface PaymentOption {
    name: string;
    light: string;
    dark: string;
}

const paymentOptions: PaymentOption[] = [
    { name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700" },
    { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },
    { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
    { name: "Green", light: "bg-green-600", dark: "bg-green-500" },
    { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
  ];

export function ThemeSelector(){
    const { themeColor, setThemeColor } = useThemeContext();
    const { theme } = useTheme();
  
    const [selected, setSelected] = useState<string | null>(themeColor);
  
    const handleSelection = (value: string) => {
      setSelected(value);
      setThemeColor(value as ThemeColors);
    };
  
    return(
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs">Color</label>
          <div className="grid grid-cols-3 gap-2">
          {
            paymentOptions.map((option) => (
              <Button variant={"outline"} 
              key={option.name}
              className={`px-3 h-8 py-0 text-xs justify-start ${selected == option.name ? "border-zinc-600 border-2" : "border"}`}
              onClick={() => handleSelection(option.name)}
              >
                <span className={cn("mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full", theme == "light" ? option.light : option.dark,)}>
                {selected === option.name && <Check className="text-white"/>}
              </span>
              {option.name}
              </Button>
            ))
          }  
          </div>
        </div>
      </div>
    )
  }
  
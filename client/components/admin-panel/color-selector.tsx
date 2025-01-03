import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

interface Props {
  name: string;
  onValueChange?(value: string): void;
}

export default function ColorSelector({name,onValueChange}:Props){
  const colors = [
        { name: "Black", value: "#000000" },
        { name: "Green", value: "#008000" },
        { name: "Blue", value: "#0000FF" },
      ];
  
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string }>(colors[2]);
  
  useEffect(() => {
    if (name != null && name.length > 1) {
      const color = colors.find((item) => item.name === name);
      if (color) {
        setSelectedColor(color);
      }
    } else {
      setSelectedColor(colors[2]);
    }
  }, [name]);

  const handleColorChange = (value: string) => {
    const color = colors.find((c) => c.name === value);
    if (color) {
      setSelectedColor(color);
      onValueChange?.(color.name);
    }
  };

  return(
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Select 
          value ={selectedColor.name}
          defaultValue={selectedColor.name}
          onValueChange={handleColorChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={setSelectedColor.name} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Colors</SelectLabel>            
              {colors.map((color) => (
                <SelectItem key={color.name} value={color.name}>{color.name}</SelectItem>          
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>      
        <div
          className="h-9 w-24 rounded"
          style={{ backgroundColor: selectedColor.value }}
        ></div>
      </div>
    </div>
  );
}

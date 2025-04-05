import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BrightnessController() {
  const [brightness, setBrightness] = useState(() => {
    // Get saved brightness or default to 100
    const savedBrightness = localStorage.getItem('brightness');
    return savedBrightness ? parseInt(savedBrightness) : 100;
  });

  // Apply brightness effect to body
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness / 100})`;
    localStorage.setItem('brightness', brightness.toString());
  }, [brightness]);

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0]);
  };

  return (
    <div className="flex items-center gap-2 max-w-[180px]">
      <Moon className={cn(
        "h-4 w-4 transition-opacity", 
        brightness < 50 ? "opacity-100" : "opacity-40"
      )} />
      <Slider
        value={[brightness]}
        min={30}
        max={100}
        step={5}
        onValueChange={handleBrightnessChange}
        className="flex-1"
      />
      <Sun className={cn(
        "h-4 w-4 transition-opacity", 
        brightness > 70 ? "opacity-100" : "opacity-40"
      )} />
    </div>
  );
}
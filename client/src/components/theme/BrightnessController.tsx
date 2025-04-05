import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Sun, Moon, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BrightnessController() {
  const DEFAULT_BRIGHTNESS = 100;
  
  const [brightness, setBrightness] = useState(() => {
    // Get saved brightness or default to 100
    const savedBrightness = localStorage.getItem('brightness');
    return savedBrightness ? parseInt(savedBrightness) : DEFAULT_BRIGHTNESS;
  });

  // Apply brightness effect to body
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness / 100})`;
    localStorage.setItem('brightness', brightness.toString());
  }, [brightness]);

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0]);
  };
  
  const resetBrightness = () => {
    setBrightness(DEFAULT_BRIGHTNESS);
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 min-w-[200px] px-2 py-1 bg-card/20 rounded-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 p-0 hover:bg-card/30"
              onClick={() => setBrightness(Math.max(30, brightness - 10))}
            >
              <Moon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Darker</p>
          </TooltipContent>
        </Tooltip>
        
        <Slider
          value={[brightness]}
          min={30}
          max={100}
          step={5}
          onValueChange={handleBrightnessChange}
          className="flex-1"
        />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 p-0 hover:bg-card/30"
              onClick={() => setBrightness(Math.min(100, brightness + 10))}
            >
              <Sun className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Brighter</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 p-0 hover:bg-card/30"
              onClick={resetBrightness}
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset brightness</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
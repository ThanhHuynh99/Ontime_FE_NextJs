"use client";

import { useState } from 'react';
import { EnterFullScreenIcon, ExitFullScreenIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

export function ScreenToggle() {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
            .then(() => setIsFullScreen(true))
            .catch((err) => console.error("Error attempting to enable full-screen mode:", err));
        } else {
          document.exitFullscreen()
            .then(() => setIsFullScreen(false))
            .catch((err) => console.error("Error attempting to exit full-screen mode:", err));
        }
      };

    return (
        <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
            <Button
                className="rounded-full w-8 h-8 bg-background mr-2"
                variant="outline"
                size="icon"
                onClick={toggleFullScreen}
            >   
              {
                isFullScreen ? 
                <><ExitFullScreenIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" /><ExitFullScreenIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" /></> :
                <><EnterFullScreenIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" /><EnterFullScreenIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" /></>
              }                
                <span className="sr-only">{isFullScreen ? 'Exit Full Screen' : 'Go Full Screen'}</span>
            </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{isFullScreen ? 'Exit Full Screen' : 'Go Full Screen'}</TooltipContent>
        </Tooltip>
        </TooltipProvider>
    );
}
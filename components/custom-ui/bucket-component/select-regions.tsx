"use client";

import React from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SelectRegionsProps {
  regions?: string[];
  selectedRegion?: string | null;
  onRegionChange?: (region: string | null) => void;
}

export default function SelectRegions({ 
  regions = [], 
  selectedRegion = null,
  onRegionChange
}: SelectRegionsProps) {
  // If there are no regions or no handler, don't render the component
  if (!regions.length || !onRegionChange) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center px-3 py-1.5 border rounded-md glass-hover border-white/20 dark:border-white/10 glass-text">
        <MapPin className="h-4 w-4 mr-2 text-zinc-400 dark:text-zinc-500" />
        <span>{selectedRegion || "All Regions"}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onRegionChange(null)}>
          <div className="flex items-center w-full justify-between">
            <span>All Regions</span>
            <div className="w-4 h-4 flex-shrink-0 ml-2">
              {!selectedRegion && <Check className="h-4 w-4" />}
            </div>
          </div>
        </DropdownMenuItem>
        
        {regions.map((region) => (
          <DropdownMenuItem 
            key={region} 
            onClick={() => onRegionChange(region)}
          >
            <div className="flex items-center w-full justify-between">
              <span>{region}</span>
              <div className="w-4 h-4 flex-shrink-0 ml-2">
                {selectedRegion === region && <Check className="h-4 w-4" />}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

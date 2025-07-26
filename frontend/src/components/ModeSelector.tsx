"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function ModeSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Mode</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Interaction Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Video</DropdownMenuItem>
        <DropdownMenuItem disabled>Audio Only</DropdownMenuItem>
        <DropdownMenuItem disabled>Text Only</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

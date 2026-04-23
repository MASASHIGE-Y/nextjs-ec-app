"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Bookmark } from "lucide-react"

type Props = {
  isBookmarked: boolean
  onClick: () => void
}

export default function BookmarkButtonPresentation({
  isBookmarked,
  onClick,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={onClick}>
            <Bookmark
              className={
               isBookmarked
                 ? "fill-green-500 text-green-500"
                  : "text-gray-400"
              }
              size={18}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? "ブックマークを解除" : "ブックマークする"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
"use client"

import { toast } from "sonner"
import { deleteBookmark } from "../../actions/deleteBookmark"
import { createBookmark } from "../../actions/createBookmark"
import BookmarkButtonPresentation from "./Presentation"
import { useState } from "react"

type Props ={
  isBookmarked: boolean
  productId: number
}

export default function BookmarkButtonContainer({
  isBookmarked: initialIsBookmarked,
  productId,
}: Props) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)

  const handleClick = async () => {
    try {
      if (isBookmarked){
        await deleteBookmark(productId)
        setIsBookmarked(false)
        toast.success("ブックマークを解除しました")
      } else {
        await createBookmark(productId)
        setIsBookmarked(true)
        toast.success("ブックマークしました")
      }
    } catch (error) {
      console.log(error)

      if(error instanceof Error) {
        toast.error(error.message)
      }else {
        toast.error("ブックマーク操作に失敗しました")
      }
    }
  }

  return(
    <BookmarkButtonPresentation
      isBookmarked={isBookmarked}
      onClick={handleClick}
    />
  )
}
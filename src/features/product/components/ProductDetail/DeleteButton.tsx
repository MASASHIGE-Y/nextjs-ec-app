"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProduct } from "../../actions/deleteProduct";
import { toast } from "sonner"

export default function DeleteButton({id}: {id: number}) {
  const router = useRouter()
  const [isPending, setIsPending]  = useState(false)

  const handleDelete = async () => {
    if(!confirm("本当に削除しますか？")) return
    try {
      setIsPending(true)
      await deleteProduct(id)
      toast.success("商品を削除しました")
      router.push("/mypage")
    } catch (error) {
      console.error(error)

      if(error instanceof Error) {
        console.error(error)
        toast.error("削除に失敗しました")
      } else {
        toast.error("削除に失敗しました")
      }
      
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded border px-3 py-1 text-sm text-red-600 hover:bg-red-50"
    >
      {isPending ? "削除中..." : "削除"}
    </button>
  )
}
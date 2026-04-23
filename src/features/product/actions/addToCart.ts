"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

export async function addToCart(productId: number) {
  const {userId} = await getCurrentUser()

  // １：カートを取得 or 作成
  let cart = await prisma.cart.findUnique({
    where: {userId},
  })

  if(!cart) {
    cart = await prisma.cart.create({
      data: {userId},
    })
  }

  // 2：商品を取得（在庫確認のため）
  const product = await prisma.product.findUnique({
    where: {id: productId},
  })

  if(!product) {
    throw new Error("商品が見つかりません")
  }

  if(product.stock <= 0) {
    throw new Error("在庫がありません")
  }

  // 3：すでにカートに入っているか確認
  const existingItem = await prisma.cartItem.findUnique({
    where:{
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  })

  if(existingItem) {
    //数量を1増やす
    if(existingItem.quantity + 1 > product.stock) {
      throw new Error("在庫数を超えています")
    }

    await prisma.cartItem.update({
      where: { id: existingItem.quantity },
      data: {
        quantity: existingItem.quantity + 1,
      },
    })
  } else {
    // 新規追加
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    })
  }

  // 4：在庫を減らす（演習仕様）
  await prisma.product.update({
    where: { id: productId},
    data: {
      stock: product.stock - 1,
    },
  })
}
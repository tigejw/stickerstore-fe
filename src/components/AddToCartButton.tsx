import { useContext } from "react"
import type { Product } from '../types/types'
import { CartContext } from "../contexts/CartContext"

interface AddToCartButtonProps {
    product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const cartContext = useContext(CartContext)

    if (!cartContext) {
        throw new Error('CartContext error')
    }

    const { addToCart } = cartContext

    function handleAddToCart(e: React.MouseEvent, product: Product) {
        e.preventDefault()
        addToCart({
            type: 'product',
            id: product.product_id,
            name: product.name,
            thumbnail_url: product.thumbnail_url ?? null,
            price: product.price,
        })
    }
    return (
        <button
            onClick={(e) => {
                handleAddToCart(e, product)
            }}
            className={"mt-2 inline-flex items-center min-h-8 bg-accent text-white rounded-full px-[0.7rem] text-xs uppercase cursor-pointer hover:opacity-90"}
        >
            Add to cart
        </button>
    )
}
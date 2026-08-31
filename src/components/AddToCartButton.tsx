import { useEffect, useRef, useState, useContext } from "react"
import type { Product } from '../types/types'
import { CartContext } from "../contexts/CartContext"

interface AddToCartButtonProps {
    product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const [justAdded, setJustAdded] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])


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
        setJustAdded(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setJustAdded(false), 200)
    }
    return (
        <button
            onClick={(e) => {
                handleAddToCart(e, product)
            }}
            className={
                `mt-2 inline-flex items-center min-h-8 text-white rounded-full px-[0.7rem] text-xs uppercase cursor-pointer transition-colors duration-150 ${justAdded ? "bg-accent-dark" : "bg-accent hover:opacity-90"
                }`
            }
        >
            Add to cart
        </button>
    )
}
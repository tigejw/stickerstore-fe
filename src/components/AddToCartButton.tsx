import { useEffect, useRef, useState, useContext } from "react"
import type { ProductOrBundle, Bundle } from '../types/types'
import { CartContext } from "../contexts/CartContext"

interface AddToCartButtonProps {
    product: ProductOrBundle
}

function isBundle(item: ProductOrBundle): item is Bundle {
    return 'bundle_id' in item
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

    function handleAddToCart(e: React.MouseEvent, item: ProductOrBundle) {
        e.preventDefault()
        addToCart({
            type: isBundle(item) ? 'bundle' : 'product',
            id: isBundle(item) ? item.bundle_id : item.product_id,
            name: item.name,
            thumbnail_url: item.thumbnail_url ?? null,
            price: item.price,
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
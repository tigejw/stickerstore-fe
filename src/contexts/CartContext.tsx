import { createContext, useEffect, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react'

export type CartItem = {
    type: 'product' | 'bundle'
    id: number
    name: string
    quantity: number
    thumbnail: string | null
    price: number
}

export type Cart = CartItem[]

const CART_STORAGE_KEY = 'stickerstore-cart'

function normalizeCartItem(item: Partial<CartItem>): CartItem | null {
    if (item.type !== 'product' && item.type !== 'bundle') {
        return null
    }

    if (typeof item.id !== 'number' || Number.isNaN(item.id)) {
        return null
    }

    return {
        type: item.type,
        id: item.id,
        name: typeof item.name === 'string' ? item.name : 'Unnamed item',
        quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
        thumbnail: typeof item.thumbnail === 'string' ? item.thumbnail : null,
        price: typeof item.price === 'number' ? item.price : 0,
    }
}

function getInitialCart(): Cart {
    if (typeof window === 'undefined') {
        return []
    }

    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) {
        return []
    }

    try {
        const parsedCart = JSON.parse(storedCart) as unknown
        if (!Array.isArray(parsedCart)) {
            return []
        }
        return parsedCart
    } catch {
        return []
    }
}


interface CartProvidersProps {
    children: ReactNode
}

export interface CartContextType {
    cart: Cart
    setCart: Dispatch<SetStateAction<Cart>>
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: CartProvidersProps) => {
    const [cart, setCart] = useState<Cart>(getInitialCart)

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }, [cart])

    return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
}
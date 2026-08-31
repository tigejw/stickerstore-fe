import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { API_URL } from '../api-url'
import type { Bundle, ProductOrBundle, ProductPageResponse } from '../types/types'
import { formatPriceFromCents } from '../utils/ProductDisplayUtils'
import AddToCartButton from '../components/AddToCartButton'


function isBundle(item: ProductOrBundle): item is Bundle {
    return 'bundle_id' in item
}

export default function ProductPage() {
    const { type, slug } = useParams()
    const location = useLocation()
    const preview = (location.state as { preview?: ProductOrBundle } | null)?.preview ?? null

    const [item, setItem] = useState<ProductOrBundle | null>(preview)
    const [loading, setLoading] = useState(!preview)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    useEffect(() => {
        if (!type || !slug) {
            setLoading(false)
            return
        }

        const apiPath = type === 'bundles' ? 'bundles' : 'products'
        axios
            .get<ProductPageResponse>(`${API_URL}/${apiPath}/${slug}`)
            .then((res) => {
                setItem(res.data.product ?? res.data.bundle ?? null)
            })
            .catch(() => {
                if (!preview) {
                    setItem(null)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [type, slug])

    useEffect(() => {
        setActiveImageIndex(0)
    }, [item])


    if (loading) {
        return (
            <main className="product-page">
                <NavBar />
                <p>Loading product...</p>
            </main>
        )
    }

    if (!item) {
        return (
            <main className="product-page">
                <NavBar />
                <p>Product not found.</p>
            </main>
        )
    }

    const isBundleItem = isBundle(item)
    const images = item.images.filter((image)=>!image.is_thumbnail) ?? []
    const activeImage = images[activeImageIndex]

    const goToPrevImage = () => {
        setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNextImage = () => {
        setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <main className="min-h-screen p-4">
            <NavBar />
            <section
                className="border border-gray-200 rounded-xl p-4"
                aria-labelledby="product-title"
            >
                <div className="mb-3">
                    <div className="relative border border-dashed border-gray-300 rounded-lg bg-gray-100 aspect-square grid place-items-center text-gray-500 overflow-hidden">
                        {activeImage ? (
                            <img
                                src={activeImage.image_url}
                                alt={activeImage.alt_text || item.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            'No image available'
                        )}

                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={goToPrevImage}
                                    aria-label="Previous image"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center h-8 w-8 rounded-full bg-white/80 text-gray-700 shadow hover:bg-white"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    onClick={goToNextImage}
                                    aria-label="Next image"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center h-8 w-8 rounded-full bg-white/80 text-gray-700 shadow hover:bg-white"
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex justify-center gap-1.5 mt-2">
                            {images.map((image, index) => (
                                <button
                                    key={image.image_url}
                                    type="button"
                                    onClick={() => setActiveImageIndex(index)}
                                    aria-label={`Show image ${index + 1}`}
                                    className={`h-2 w-2 rounded-full ${index === activeImageIndex ? 'bg-gray-700' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <h1 id="product-title" className="text-xl font-semibold m-0">
                    {item.name}
                </h1>

                <p className="mt-1.5 text-gray-600">{formatPriceFromCents(item.price)}</p>
                <p className="mt-3 leading-relaxed">{item.description}</p>

                {isBundleItem && (
                    <div className="mt-4">
                        <h2 className="text-base font-semibold">Includes:</h2>
                        <ul className="mt-2 space-y-1">
                            {item.products.map((product) => (
                                <li key={product.product_id}>
                                    {product.name} - {formatPriceFromCents(product.price)}
                                </li>
                            ))}
                        </ul>
                        {/* TODO: small component showing thumbnails of included products' images */}
                    </div>
                )}

                <AddToCartButton product={item} />
            </section>
        </main>
    )
}
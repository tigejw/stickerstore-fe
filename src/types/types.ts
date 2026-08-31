
export type Product = {
  product_id: number
  slug: string
  name: string
  description: string
  price: number
  thumbnail_url: string
  thumbnail_alt_text?: string
}
export type Bundle = {
    bundle_id: number
    slug: string
    name: string
    description: string
    thumbnail_url: string
    thumbnail_alt_text: string
    price: number
    active: boolean
    created_at: string
    is_new: boolean
    images: BundleImage[]
    products: Product[]
}

type BundleImage = {
  image_url: string;
  alt_text: string;
  is_thumbnail: boolean;
  display_order: number;
}

//ProductDisplay
type StickerOrBundle = "sticker" | "bundle"
export type ProductsDisplayProps = {
  stickerOrBundle: StickerOrBundle
}

export type SortOption =
    | 'price-asc'
    | 'price-desc'
    | 'name-asc'
    | 'name-desc'
    | 'created_at-asc'
    | 'created_at-desc'


//ProductPage
export type ProductPageResponse = {
    product?: ProductOrBundle
    bundle?: ProductOrBundle
}
export type ProductOrBundle = Product | Bundle

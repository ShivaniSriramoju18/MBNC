export interface Product {
  id: string
  name: string
  subtitle: string
  image: string
  category: string
  price: number
  description: string
  benefits: string[]
  dosage: string | null
  formUrl?: string
  offer?: string
}
export interface TeamMember {
  name: string
  role: string
  photo?: string
}

export interface Review {
  id: number
  productId: string
  name: string
  rating: number
  message: string
}

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
  id: string
  productId: string
  name: string
  rating: number
  message: string
  /** Firebase uid of whoever wrote the review — decides who may edit/delete it. */
  ownerUid: string
  /** Milliseconds since epoch. */
  createdAt: number
  /** Set once the review has been edited. */
  updatedAt?: number
}

export interface ReviewInput {
  name: string
  rating: number
  message: string
}
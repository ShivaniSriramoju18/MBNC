export function getDiscountedPrice(price: number, offer?: string): number | null {
  if (!offer) return null
  const match = offer.match(/(\d+(\.\d+)?)\s*%/)
  if (!match) return null
  const percent = parseFloat(match[1])
  if (isNaN(percent) || percent <= 0 || percent >= 100) return null
  const discounted = price - (price * percent) / 100
  return Math.round(discounted)
}
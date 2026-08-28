import { useEffect, useRef, useState } from 'react'

export default function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

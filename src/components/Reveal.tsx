import type { ElementType, ReactNode, CSSProperties } from 'react'
import useReveal from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
  style?: CSSProperties
}

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }: RevealProps) {
  const [ref, visible] = useReveal<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

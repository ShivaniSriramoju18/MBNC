import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal'

interface CountUpProps {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}

export default function CountUp({ to, duration = 1400, suffix = '', prefix = '' }: CountUpProps) {
  const [ref, visible] = useReveal<HTMLSpanElement>(0.4)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!visible) return
    let start: number | null = null
    let frame: number
    function step(ts: number) {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [visible, to, duration])

  return (
    <span ref={ref}>
      {prefix}{value}{suffix}
    </span>
  )
}

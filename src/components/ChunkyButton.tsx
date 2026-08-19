import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { sfx } from '@/audio/sfx'
import { useProgress } from '@/state/progress'

type Variant = 'gold' | 'jade' | 'sky' | 'coral' | 'ghost' | 'plain'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'md' | 'lg' | 'sm'
  silent?: boolean
}

/** The signature chunky 3D button. Plays a tap sound on press. */
export const ChunkyButton = forwardRef<HTMLButtonElement, Props>(function ChunkyButton(
  { variant = 'gold', size = 'md', silent, className = '', onClick, style, ...rest },
  ref,
) {
  const sound = useProgress((s) => s.settings.sound)
  const cls = variant === 'plain' ? 'btn' : `btn btn-${variant}`
  const sizeStyle =
    size === 'lg'
      ? { padding: '17px 34px', fontSize: 18 }
      : size === 'sm'
        ? { padding: '9px 18px', fontSize: 14 }
        : undefined
  return (
    <button
      ref={ref}
      className={`${cls} ${className}`}
      style={{ ...sizeStyle, ...style }}
      onClick={(e) => {
        if (!silent && sound) sfx.play('tap')
        onClick?.(e)
      }}
      {...rest}
    />
  )
})

export default ChunkyButton

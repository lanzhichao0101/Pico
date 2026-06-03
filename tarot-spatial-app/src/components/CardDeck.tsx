import { useEffect, useRef, useState } from 'react'

interface CardDeckProps {
  /** 洗牌动画结束后回调 */
  onShuffled: () => void
}

const SHUFFLE_DURATION = 1400 // ms
const LAYER_COUNT = 5

/**
 * 牌堆 + 洗牌：JS 驱动动画（非 CSS），5 层牌用 Z 轴偏移叠放（不靠 z-index）。
 */
export function CardDeck({ onShuffled }: CardDeckProps) {
  const [shuffling, setShuffling] = useState(false)
  const [t, setT] = useState(0) // 0..1 动画进度
  const rafRef = useRef<number>(0)

  const startShuffle = () => {
    if (shuffling) return
    setShuffling(true)
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / SHUFFLE_DURATION, 1)
      setT(p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setShuffling(false)
        setT(0)
        onShuffled()
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  // 洗牌摆动：sin 波，随进度衰减
  const swing = Math.sin(t * Math.PI * 4) * (1 - t)
  const buttonLabel = shuffling ? '洗 牌 中…' : '洗 牌'

  return (
    <div className="card-deck-wrap">
      <button
        className="ritual-btn shuffle-btn shuffle-btn-primary"
        enable-xr
        onClick={startShuffle}
        disabled={shuffling}
        type="button"
      >
        {buttonLabel}
      </button>

      <p className="shuffle-hint">轻触牌堆或按钮开始洗牌</p>

      <div
        className="card-deck"
        enable-xr
        onClick={startShuffle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') startShuffle()
        }}
        role="button"
        tabIndex={shuffling ? -1 : 0}
        aria-disabled={shuffling}
        aria-label={buttonLabel}
      >
        {Array.from({ length: LAYER_COUNT }).map((_, i) => {
          const phase = swing * (1 + i * 0.3)
          return (
            <div
              key={i}
              className="deck-layer"
              enable-xr
              style={{
                transform: `translateZ(${i * 6}px) translateX(${
                  phase * 26
                }px) rotateZ(${phase * 4}deg)`,
              }}
            >
              <span className="deck-mark">✦</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

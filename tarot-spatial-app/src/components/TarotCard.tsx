import { useEffect, useRef, useState } from 'react'
import type { DrawnCard } from '../types/tarot'

interface TarotCardProps {
  drawn: DrawnCard
  revealed: boolean
  onTap?: () => void
}

const FLIP_DURATION = 600 // ms

/**
 * 卡牌：JS 驱动翻牌动画（不使用 CSS animation，兼容 WebSpatial 空间元素）。
 * - 未翻开：牌背朝上
 * - 翻开：rotateY 从 0 动画到 180，跨过 90° 时切换显示牌面
 */
export function TarotCard({ drawn, revealed, onTap }: TarotCardProps) {
  const [angle, setAngle] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const target = revealed ? 180 : 0
    const start = performance.now()
    const from = angle

    function step(now: number) {
      const t = Math.min((now - start) / FLIP_DURATION, 1)
      // easeInOutCubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      setAngle(from + (target - from) * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed])

  const showFront = angle >= 90
  const { card, isReversed } = drawn
  // 牌面：容器 rotateY(180) 会水平镜像，用 rotateY(180) 抵消；逆位再叠加 rotateZ(180)
  const faceTransform = showFront
    ? `rotateY(180deg)${isReversed ? ' rotateZ(180deg)' : ''}`
    : 'none'

  return (
    <div
      className="tarot-card"
      enable-xr
      onSpatialTap={onTap as never}
      onClick={onTap}
      style={{ transform: `rotateY(${angle}deg)` }}
    >
      <div className="tarot-card-face" style={{ transform: faceTransform }}>
        {showFront ? (
          <img className="tarot-card-img" src={card.image} alt={card.nameCn} />
        ) : (
          <div className="tarot-card-back">
            <span className="tarot-card-back-mark">✦</span>
          </div>
        )}
      </div>
    </div>
  )
}

import { useCallback, useState } from 'react'
import type { DrawnCard } from '../types/tarot'
import type { Domain } from '../data/domains'
import { getSpreadById, getDefaultSpread } from '../data/spreads'
import { drawForPositions } from '../lib/draw'
import { interpret } from '../lib/interpretation'
import type { Interpretation } from '../lib/interpretation'

/**
 * 测算流程阶段：
 * - intro    进入场景，等待选择领域
 * - shuffle  已选领域，等待洗牌
 * - draw     已洗牌，牌堆就绪，等待抽牌
 * - reveal   已抽牌（牌背朝上），等待翻牌
 * - result   已翻牌，展示解读
 */
export type ReadingPhase = 'intro' | 'shuffle' | 'draw' | 'reveal' | 'result'

// MVP 固定单张牌阵
const MVP_SPREAD = getSpreadById('single') ?? getDefaultSpread()

export function useTarotReading() {
  const [phase, setPhase] = useState<ReadingPhase>('intro')
  const [domain, setDomain] = useState<Domain | null>(null)
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [revealed, setRevealed] = useState(false)

  /** 选择测算领域 → 进入洗牌阶段 */
  const selectDomain = useCallback((d: Domain) => {
    setDomain(d)
    setPhase('shuffle')
  }, [])

  /** 洗牌：抽好牌（牌背朝上），进入待抽/待翻阶段 */
  const shuffleDeck = useCallback(() => {
    const drawn = drawForPositions(MVP_SPREAD.positions)
    setDrawnCards(drawn)
    setRevealed(false)
    setPhase('draw')
  }, [])

  /** 抽牌：从牌堆抽出选中的牌到桌面中央（牌背仍朝上） */
  const pickCard = useCallback(() => {
    setPhase('reveal')
  }, [])

  /** 翻牌：亮出牌面并生成解读 */
  const revealCard = useCallback(() => {
    setRevealed(true)
    setPhase('result')
  }, [])

  /** 重新测算：回到选择领域 */
  const reset = useCallback(() => {
    setPhase('intro')
    setDomain(null)
    setDrawnCards([])
    setRevealed(false)
  }, [])

  const primaryCard = drawnCards[0] ?? null
  const interpretation: Interpretation | null =
    revealed && primaryCard && domain ? interpret(primaryCard, domain) : null

  return {
    phase,
    domain,
    spread: MVP_SPREAD,
    drawnCards,
    primaryCard,
    revealed,
    interpretation,
    selectDomain,
    shuffleDeck,
    pickCard,
    revealCard,
    reset,
  }
}

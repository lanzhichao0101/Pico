import type { DrawnCard } from '../types/tarot'
import type { Domain } from '../data/domains'

export interface Interpretation {
  /** 牌名 + 正逆位标题 */
  title: string
  /** 关键词列表 */
  keywords: string[]
  /** 核心牌义 */
  meaning: string
  /** 结合领域的一句建议 */
  advice: string
}

/**
 * MVP 本地静态解读：不依赖 LLM，基于牌的 keywords / meaning 与所选领域拼装。
 */
export function interpret(drawn: DrawnCard, domain: Domain): Interpretation {
  const { card, isReversed } = drawn
  const orientation = isReversed ? '逆位' : '正位'
  const keywords = isReversed ? card.keywords.reversed : card.keywords.upright
  const meaning = isReversed ? card.meaning.reversed : card.meaning.upright

  const advice = isReversed
    ? `在${domain.nameCn}上，这张牌提醒你留意「${keywords[0]}」带来的阻碍，不必强求，调整后再出发。`
    : `在${domain.nameCn}上，顺着「${keywords[0]}」的指引前行，时机正在向你靠拢。`

  return {
    title: `${card.nameCn} · ${orientation}`,
    keywords,
    meaning,
    advice,
  }
}

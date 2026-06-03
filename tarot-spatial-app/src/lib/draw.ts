import type { DrawnCard, SpreadPosition, TarotCard } from '../types/tarot'
import { allCards } from '../data/cards'

/** Fisher–Yates 洗牌，返回新数组，不修改原数组 */
export function shuffle<T>(source: readonly T[]): T[] {
  const arr = [...source]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * 按牌阵位置抽牌：洗牌后取前 N 张，每张随机正逆位。
 */
export function drawForPositions(positions: SpreadPosition[]): DrawnCard[] {
  const deck = shuffle(allCards)
  return positions.map((position, index) => ({
    card: deck[index] as TarotCard,
    isReversed: Math.random() > 0.5,
    position,
  }))
}

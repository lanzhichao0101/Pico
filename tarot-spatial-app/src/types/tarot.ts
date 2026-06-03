// 塔罗领域类型定义（迁移自 TarotWhisper，裁剪掉 LLM/追问相关类型）

export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'

export type CardType = 'major' | 'minor'

export interface TarotCard {
  id: string
  name: string
  nameCn: string
  type: CardType
  suit?: Suit
  number: number
  image: string
  keywords: {
    upright: string[]
    reversed: string[]
  }
  meaning: {
    upright: string
    reversed: string
  }
}

export interface SpreadPosition {
  id: string
  name: string
  nameCn: string
  description: string
}

export interface Spread {
  id: string
  name: string
  nameCn: string
  description: string
  positions: SpreadPosition[]
}

export interface DrawnCard {
  card: TarotCard
  isReversed: boolean
  position: SpreadPosition
}

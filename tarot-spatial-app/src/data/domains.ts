// 测算领域配置

export interface Domain {
  id: string
  nameCn: string
  name: string
  emoji: string
  /** 进入该领域时云朵显示的仪式文案 */
  ritual: string
}

export const domains: Domain[] = [
  {
    id: 'love',
    nameCn: '爱情',
    name: 'Love',
    emoji: '💗',
    ritual: '让心安静下来，想着那个让你牵挂的人……',
  },
  {
    id: 'career',
    nameCn: '事业',
    name: 'Career',
    emoji: '💼',
    ritual: '凝神于你正在走的路，问题会自己浮现……',
  },
  {
    id: 'wealth',
    nameCn: '财富',
    name: 'Wealth',
    emoji: '💰',
    ritual: '想象财富流动的方向，让牌来指引……',
  },
  {
    id: 'study',
    nameCn: '学业',
    name: 'Study',
    emoji: '📚',
    ritual: '把困惑交给牌，专注于你想突破的那道关……',
  },
  {
    id: 'health',
    nameCn: '健康',
    name: 'Health',
    emoji: '🌿',
    ritual: '深呼吸，感受身体的声音……',
  },
  {
    id: 'general',
    nameCn: '通用',
    name: 'General',
    emoji: '✨',
    ritual: '清空杂念，让此刻最需要的指引到来……',
  },
]

export function getDomainById(id: string): Domain | undefined {
  return domains.find((d) => d.id === id)
}

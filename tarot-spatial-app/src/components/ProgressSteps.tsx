import type { ReadingPhase } from '../hooks/useTarotReading'

const STEPS: { key: ReadingPhase; label: string }[] = [
  { key: 'intro', label: '选领域' },
  { key: 'shuffle', label: '洗牌' },
  { key: 'draw', label: '抽牌' },
  { key: 'reveal', label: '翻牌' },
  { key: 'result', label: '结果' },
]

interface ProgressStepsProps {
  phase: ReadingPhase
}

/** 流程进度指示 */
export function ProgressSteps({ phase }: ProgressStepsProps) {
  const activeIndex = STEPS.findIndex((s) => s.key === phase)
  return (
    <div className="progress-steps" enable-xr>
      {STEPS.map((s, i) => (
        <div
          key={s.key}
          className={`progress-step${i <= activeIndex ? ' active' : ''}`}
        >
          <span className="progress-dot" />
          <span className="progress-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

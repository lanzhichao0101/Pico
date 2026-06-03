import './App.css'
import { useTarotReading } from './hooks/useTarotReading'
import { DomainPanel } from './components/DomainPanel'
import { CardDeck } from './components/CardDeck'
import { TarotCard } from './components/TarotCard'
import { ResultCloud } from './components/ResultCloud'
import { ProgressSteps } from './components/ProgressSteps'

function App() {
  const r = useTarotReading()

  // 云朵提示文案：随阶段变化
  const cloudHint =
    r.phase === 'intro'
      ? '请在心中想好你的问题……'
      : r.phase === 'shuffle'
        ? r.domain?.ritual ?? '凝神静心，准备洗牌……'
        : r.phase === 'draw'
          ? '牌已洗好，抽取一张属于你的牌'
          : r.phase === 'reveal'
            ? '轻触卡牌，揭晓指引'
            : ''

  return (
    <main className="tarot-shell" enable-xr-monitor>
      <ProgressSteps phase={r.phase} />

      {/* 数字人 + 头顶云朵 */}
      <div className="avatar-zone">
        <ResultCloud
          interpretation={r.interpretation}
          hint={cloudHint}
          domainName={r.domain?.nameCn}
        />
        <div className="avatar-host" enable-xr>
          {/* 数字人占位（2.5D），Phase 5 替换为 .usdz 模型 */}
          <div className="avatar-figure" aria-hidden="true">
            <span className="avatar-face">🔮</span>
          </div>
          <span className="avatar-caption">塔罗占卜师</span>
        </div>
      </div>

      {/* 桌面区域 */}
      <div className="table-stage" enable-xr>
        <div className="table-top" />

        {r.phase === 'intro' && <DomainPanel onSelect={r.selectDomain} />}

        {r.phase === 'shuffle' && <CardDeck onShuffled={r.shuffleDeck} />}

        {r.phase === 'draw' && r.primaryCard && (
          <div className="stage-center">
            <p className="stage-tip">点击牌堆，抽取你的牌</p>
            <div className="draw-pile" enable-xr onClick={r.pickCard}>
              <TarotCard drawn={r.primaryCard} revealed={false} onTap={r.pickCard} />
            </div>
          </div>
        )}

        {(r.phase === 'reveal' || r.phase === 'result') && r.primaryCard && (
          <div className="stage-center">
            <TarotCard
              drawn={r.primaryCard}
              revealed={r.revealed}
              onTap={r.phase === 'reveal' ? r.revealCard : undefined}
            />
            {r.phase === 'reveal' && (
              <p className="stage-tip">轻触卡牌翻开</p>
            )}
            {r.phase === 'result' && (
              <button className="ritual-btn reset-btn" enable-xr onClick={r.reset}>
                重新测算
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default App

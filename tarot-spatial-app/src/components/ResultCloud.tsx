import type { Interpretation } from '../lib/interpretation'

interface ResultCloudProps {
  /** 云朵内容：测算结果，或仪式/提示文案 */
  interpretation?: Interpretation | null
  /** 没有结果时显示的提示文案（仪式语 / 引导语） */
  hint?: string
  domainName?: string
}

/**
 * 数字人头顶的"小云朵"：空间化 HTML 面板，展示结果或提示。
 */
export function ResultCloud({ interpretation, hint, domainName }: ResultCloudProps) {
  return (
    <div className="result-cloud" enable-xr>
      <div className="cloud-tail" aria-hidden="true" />
      {interpretation ? (
        <div className="cloud-body">
          {domainName && <div className="cloud-domain">{domainName}</div>}
          <div className="cloud-card-title">{interpretation.title}</div>
          <div className="cloud-keywords">
            {interpretation.keywords.map((k) => (
              <span key={k} className="cloud-kw">
                {k}
              </span>
            ))}
          </div>
          <p className="cloud-meaning">{interpretation.meaning}</p>
          <p className="cloud-advice">{interpretation.advice}</p>
        </div>
      ) : (
        <div className="cloud-body">
          <p className="cloud-hint">{hint}</p>
        </div>
      )}
    </div>
  )
}

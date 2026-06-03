import { domains } from '../data/domains'
import type { Domain } from '../data/domains'

interface DomainPanelProps {
  onSelect: (domain: Domain) => void
}

/** 测算领域选择面板 */
export function DomainPanel({ onSelect }: DomainPanelProps) {
  return (
    <section className="domain-panel" enable-xr>
      <h2 className="domain-title">选择你想测算的领域</h2>
      <div className="domain-grid">
        {domains.map((d) => (
          <button
            key={d.id}
            className="domain-item"
            enable-xr
            onClick={() => onSelect(d)}
          >
            <span className="domain-emoji">{d.emoji}</span>
            <span className="domain-name">{d.nameCn}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

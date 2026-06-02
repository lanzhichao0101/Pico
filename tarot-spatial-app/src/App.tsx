import { useEffect, useRef, useState } from 'react'
import './App.css'

// ─── T0.5 Spike 验证页 ───
// 验证三件事：
// 1. 牌图 <img> 在 enable-xr 空间容器内能正常加载显示
// 2. JS(requestAnimationFrame) 驱动 transform 动画在模拟器里流畅
// 3. onSpatialTap 空间点击事件在卡牌上能触发

function App() {
  // 验证点2：JS 驱动的持续旋转角度（绕 Y 轴）
  const [angle, setAngle] = useState(0)
  // 验证点3：记录点击次数与最近一次点击坐标
  const [tapCount, setTapCount] = useState(0)
  const [lastTap, setLastTap] = useState<string>('尚未点击')
  // 验证点1：图片加载状态
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  // 验证点2：是否开启动画
  const [spinning, setSpinning] = useState(true)

  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!spinning) return
    function tick() {
      setAngle((prev) => (prev + 0.8) % 360)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [spinning])

  // onSpatialTap 在不支持 WebSpatial 的普通浏览器里不会触发，
  // 所以同时绑定 onClick 作为降级，方便本地浏览器先验证逻辑。
  const handleTap = (e?: { offsetX?: number; offsetY?: number; offsetZ?: number }) => {
    setTapCount((c) => c + 1)
    if (e && e.offsetX != null) {
      setLastTap(
        `offset(${e.offsetX?.toFixed(0)}, ${e.offsetY?.toFixed(0)}, ${e.offsetZ?.toFixed(0)})`,
      )
    } else {
      setLastTap('普通 click（非空间）')
    }
    // 点一下切换动画开关，验证状态驱动
    setSpinning((s) => !s)
  }

  return (
    <main className="spike-shell" enable-xr-monitor>
      <section className="spike-panel" enable-xr>
        <h1>WebSpatial Spike 验证</h1>
        <p className="hint">
          请在 PICO 模拟器中打开此页，逐项确认下方三个检查点。
        </p>

        <ul className="checklist">
          <li>
            <strong>① 牌图加载：</strong>
            {imgError ? '❌ 加载失败' : imgLoaded ? '✅ 已加载' : '⏳ 加载中…'}
          </li>
          <li>
            <strong>② JS 动画：</strong>
            当前角度 {angle.toFixed(0)}° {spinning ? '（旋转中）' : '（已暂停）'}
          </li>
          <li>
            <strong>③ 空间点击：</strong>
            共 {tapCount} 次，最近 {lastTap}
          </li>
        </ul>
      </section>

      {/* 验证点1+2+3：卡牌图在 enable-xr 容器内，JS 驱动旋转，可被空间点击 */}
      <div
        className="spike-card"
        enable-xr
        onSpatialTap={handleTap as never}
        onClick={() => handleTap()}
        style={{
          transform: `translateZ(60px) rotateY(${angle}deg)`,
        }}
      >
        <img
          className="spike-card-img"
          src="/cards/major/00-fool.jpg"
          alt="The Fool"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      </div>

      <p className="tap-tip">点击 / 注视捏合卡牌：切换旋转 + 记录点击</p>
    </main>
  )
}

export default App

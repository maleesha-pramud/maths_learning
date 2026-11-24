import katex from 'katex'
import 'katex/dist/katex.min.css'
import type { ReactNode } from 'react'

export function Tex({ t, block }: { t: string; block?: boolean }) {
  let html = t
  try {
    html = katex.renderToString(t, { displayMode: !!block, throwOnError: false })
  } catch {
    /* fallback to raw text */
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export function Formula({ tex, say }: { tex: string; say?: string }) {
  return (
    <div style={{ textAlign: 'center', margin: '10px 0' }}>
      <div style={{ fontSize: '1.3em' }}>
        <Tex t={tex} block />
      </div>
      {say && <div className="say">🗣️ {say}</div>}
    </div>
  )
}

export const Story = ({ emoji, children }: { emoji: string; children: ReactNode }) => (
  <div className="story">
    <b>{emoji} සැබෑ ලෝකයේ උදාහරණය:</b>
    <div>{children}</div>
  </div>
)
